using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool MainPhoto { get; set; }
        public string PublicId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}