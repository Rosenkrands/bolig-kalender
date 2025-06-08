using System.ComponentModel.DataAnnotations;
using asp_net_core_project.Models.Dtos;

namespace asp_net_core_project.Models.Entities;

public class MaintenanceTask
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = default!;

    public string? Description { get; set; }

    // Tags for which housing types this task applies to (can be both)
    public List<string> HousingTypes { get; set; } = [];

    // The months (1-12) this task is relevant for
    public List<int> RelevantMonths { get; set; } = [];

    public MaintenanceTaskDto ToDto()
    {
        return new MaintenanceTaskDto
        {
            Id = Id,
            Title = Title,
            Description = Description,
            HousingTypes = HousingTypes,
            RelevantMonths = RelevantMonths
        };
    }
}