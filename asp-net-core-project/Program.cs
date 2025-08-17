using System.Security.Claims;
using asp_net_core_project.Data;
using asp_net_core_project.Models.Entities;
using asp_net_core_project.Models.Requests;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var connectionString = $"Server={Environment.GetEnvironmentVariable("POSTGRES_SERVER")};" +
                       $"Port={Environment.GetEnvironmentVariable("POSTGRES_PORT")};" +
                       $"Database={Environment.GetEnvironmentVariable("POSTGRES_DB")};" +
                       $"User Id={Environment.GetEnvironmentVariable("POSTGRES_USER")};" +
                       $"Password={Environment.GetEnvironmentVariable("POSTGRES_PASSWORD")};";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});
builder.Services.AddOpenApi();
builder.Services.AddCors();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "BoligKalenderAppCookie";
});

// Add Swagger services
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

var app = builder.Build();

app.UseForwardedHeaders();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
}

app.UseAuthorization();
app.MapIdentityApi<ApplicationUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<ApplicationUser> signInManager) =>
{
    await signInManager.SignOutAsync();
    return Results.Ok();
}).RequireAuthorization();

app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    return Results.Json(new { Email = email });
}).RequireAuthorization();

app.MapGet("/account", async (UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext, ClaimsPrincipal user) =>
{
    // Get the current user's ID from the ClaimsPrincipal
    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrEmpty(userId))
    {
        // If the user ID is not found, return a 401 Unauthorized response
        return Results.Unauthorized();
    }

    // Retrieve the account information for the current user from the database
    var accountInfo = await dbContext.AccountInformations
        .FirstOrDefaultAsync(a => a.UserId == userId);

    if (accountInfo == null)
    {
        // If no account information is found, return a 404 Not Found response
        return Results.NoContent();
    }

    // Return the account information as a DTO
    return Results.Ok(accountInfo.ToDto());
}).RequireAuthorization();

app.MapPost("/account", async (UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext, ClaimsPrincipal user, [FromBody] AccountInformationRequest model) =>
{
    // Get the current user's ID from the ClaimsPrincipal
    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrEmpty(userId))
    {
        // If the user ID is not found, return a 401 Unauthorized response
        return Results.Unauthorized();
    }

    // Find the user by ID
    var applicationUser = await userManager.FindByIdAsync(userId);
    if (applicationUser == null)
    {
        // If the user is not found, return a 404 Not Found response
        return Results.NotFound();
    }

    // Try to get the account information for the current user
    var accountInfo = await dbContext.AccountInformations
        .FirstOrDefaultAsync(a => a.UserId == userId);

    if (accountInfo == null)
    {
        // If no account information is found, create a new one
        accountInfo = new AccountInformation
        {
            // Set the UserId to the current user's ID
            UserId = userId,
            User = applicationUser,

            // Set the first and last name from the model
            FirstName = model.FirstName,
            LastName = model.LastName,
        };
        dbContext.AccountInformations.Add(accountInfo);
    }
    else
    {
        // Update existing account information with new values from the model
        accountInfo.FirstName = model.FirstName;
        accountInfo.LastName = model.LastName;
    }

    // Save changes to the database
    await dbContext.SaveChangesAsync();
    // Return the updated account information as a DTO
    return Results.Ok(accountInfo.ToDto());
}).RequireAuthorization();

// Endpoint to delete a user account
app.MapPost("/deleteaccount", async (UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ClaimsPrincipal user) =>
{
    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrEmpty(userId))
    {
        return Results.Unauthorized();
    }

    var applicationUser = await userManager.FindByIdAsync(userId);
    if (applicationUser == null)
    {
        return Results.NotFound();
    }

    var result = await userManager.DeleteAsync(applicationUser);
    if (!result.Succeeded)
    {
        return Results.BadRequest(result.Errors);
    }

    // Sign out the user after deletion
    await signInManager.SignOutAsync();

    return Results.Ok();
}).RequireAuthorization();

// Get the HousingType for the current user
app.MapGet("/housing-type", async (UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext, ClaimsPrincipal user) =>
{
    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrEmpty(userId))
    {
        return Results.Unauthorized();
    }

    var accountInfo = await dbContext.AccountInformations
        .FirstOrDefaultAsync(a => a.UserId == userId);

    if (accountInfo == null)
    {
        return Results.NoContent();
    }

    return Results.Ok(accountInfo.HousingType);
}).RequireAuthorization();

// Set the HousingType for the current user
app.MapPost("/housing-type", async (UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext, ClaimsPrincipal user, [FromBody] HousingTypeRequest request) =>
{
    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrEmpty(userId))
    {
        return Results.Unauthorized();
    }

    // Find the user by ID
    var applicationUser = await userManager.FindByIdAsync(userId);
    if (applicationUser == null)
    {
        // If the user is not found, return a 404 Not Found response
        return Results.NotFound();
    }

    var accountInfo = await dbContext.AccountInformations
        .FirstOrDefaultAsync(a => a.UserId == userId);

    if (accountInfo == null)
    {
        return Results.NotFound();
    }

    if (accountInfo == null)
    {
        // If no account information is found, create a new one
        accountInfo = new AccountInformation
        {
            // Set the UserId to the current user's ID
            UserId = userId,
            User = applicationUser,

            // Set the housing type from the request
            HousingType = request.HousingType

        };
        dbContext.AccountInformations.Add(accountInfo);
    }
    else
    {
        // Update existing account information with new value from the request
        accountInfo.HousingType = request.HousingType;
    }

    await dbContext.SaveChangesAsync();

    return Results.Ok(accountInfo.HousingType);
}).RequireAuthorization();

// Post endpoint to create a maintenance task
app.MapPost("/maintenance-tasks", async (ApplicationDbContext dbContext, ClaimsPrincipal user, [FromBody] MaintenanceTaskRequest request) =>
{
    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrEmpty(userId))
    {
        return Results.Unauthorized();
    }

    var accountInfo = await dbContext.AccountInformations
        .FirstOrDefaultAsync(a => a.UserId == userId);

    if (accountInfo == null)
    {
        return Results.NotFound();
    }

    var task = new MaintenanceTask
    {
        Title = request.Title,
        Description = request.Description,
        RelevantMonths = request.RelevantMonths,
        HousingTypes = request.HousingTypes,
        // UserId = userId
    };

    dbContext.MaintenanceTasks.Add(task);
    await dbContext.SaveChangesAsync();

    return Results.Created($"/api/maintenance-tasks/{task.Id}", task);
}).RequireAuthorization();

app.UseCors(p => p
    .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost" || new Uri(origin).Host.EndsWith($".{Environment.GetEnvironmentVariable("DOMAIN")}"))
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

app.UseHttpsRedirection();

app.Run();
