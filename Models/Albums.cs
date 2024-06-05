using MetaPhotoProject.Models;

public class Album
{
    public int Id { get; set; }
    public string Title { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}

public class EnrichedAlbum
{
    public int Id { get; set; }
    public string Title { get; set; }
    public EnrichedUser User { get; set; }
}