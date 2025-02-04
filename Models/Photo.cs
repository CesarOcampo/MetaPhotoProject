﻿public class Photo
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Url { get; set; }
    public string ThumbnailUrl { get; set; }
    public int AlbumId { get; set; }
    public Album Album { get; set; }
}
public class EnrichedPhoto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Url { get; set; }
    public string ThumbnailUrl { get; set; }
    public EnrichedAlbum Album { get; set; }
}