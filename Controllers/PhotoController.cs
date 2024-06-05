using MetaPhotoProject.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("externalapi/[controller]")]
public class PhotosController : ControllerBase
{
    private readonly IHttpClientFactory _clientFactory;

    public PhotosController(IHttpClientFactory clientFactory)
    {
        _clientFactory = clientFactory;
    }

    [HttpGet]
    public async Task<IActionResult> GetFilteredPhotos(
        [FromQuery] string title = null,
        [FromQuery] string albumTitle = null,
        [FromQuery] string userEmail = null,
        [FromQuery] int limit = 25,
        [FromQuery] int offset = 0)
    {
        try
        {
            var httpClient = _clientFactory.CreateClient();

            var photos = await httpClient.GetFromJsonAsync<Photo[]>("https://jsonplaceholder.typicode.com/photos");
            var albums = await httpClient.GetFromJsonAsync<Album[]>("https://jsonplaceholder.typicode.com/albums");
            var users = await httpClient.GetFromJsonAsync<User[]>("https://jsonplaceholder.typicode.com/users");

            var filteredPhotos = photos
                .Join(albums, photo => photo.AlbumId, album => album.Id, (photo, album) => new { photo, album })
                .Join(users, pa => pa.album.UserId, user => user.Id, (pa, user) => new { pa.photo, pa.album, user })
                .Where(p =>
                    (string.IsNullOrEmpty(title) || p.photo.Title.Contains(title, StringComparison.OrdinalIgnoreCase)) &&
                    (string.IsNullOrEmpty(albumTitle) || p.album.Title.Contains(albumTitle, StringComparison.OrdinalIgnoreCase)) &&
                    (string.IsNullOrEmpty(userEmail) || p.user.Email.Equals(userEmail, StringComparison.OrdinalIgnoreCase)))
                .Skip(offset)
                .Take(limit)
                .Select(p => new EnrichedPhoto
                {
                    Id = p.photo.Id,
                    Title = p.photo.Title,
                    Url = p.photo.Url,
                    ThumbnailUrl = p.photo.ThumbnailUrl,
                    Album = new EnrichedAlbum
                    {
                        Id = p.album.Id,
                        Title = p.album.Title,
                        User = new EnrichedUser
                        {
                            Id = p.user.Id,
                            Name = p.user.Name,
                            Username = p.user.Username,
                            Email = p.user.Email,
                            Address = p.user.Address,
                            Phone = p.user.Phone,
                            Website = p.user.Website,
                            Company = p.user.Company
                        }
                    }
                })
                .ToList();

            return Ok(filteredPhotos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
