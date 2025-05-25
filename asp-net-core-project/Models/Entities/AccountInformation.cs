using asp_net_core_project.Data;
using asp_net_core_project.Models.Dtos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace asp_net_core_project.Models.Entities;

public class AccountInformation : IEntity<int, AccountInformationDto>
{
    public int Id { get; set; }

    // Foreign key to ApplicationUser
    [Required]
    public required string UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public required ApplicationUser User { get; set; }

    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public AccountInformationDto ToDto()
    {
        return new AccountInformationDto
        {
            Id = Id,
            FirstName = FirstName,
            LastName = LastName,
        };
    }
}