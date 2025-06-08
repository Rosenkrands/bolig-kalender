namespace asp_net_core_project.Models.Dtos;

public class MaintenanceTaskDto : IDto
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string? Description { get; set; }

    // Tags for which housing types this task applies to (can be both)
    public List<string> HousingTypes { get; set; } = [];

    // The months (1-12) this task is relevant for
    public List<int> RelevantMonths { get; set; } = [];
}