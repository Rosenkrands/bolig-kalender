namespace asp_net_core_project.Models.Dtos;

public class AccountInformationDto : IDto
{
    public int Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    // Additional properties can be added here as needed
}