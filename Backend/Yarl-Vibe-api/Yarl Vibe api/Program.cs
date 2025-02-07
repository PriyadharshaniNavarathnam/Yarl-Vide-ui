using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using Yarl_Vibe_api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAuthentication();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("yarlVibeDBCon2"));
});

//builder.Services.AddIdentityApiEndpoints<IdentityUser>()
//    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedEmail = false;
    options.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<ApplicationDbContext>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//JSON Serializer
builder.Services.AddControllers().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore).AddNewtonsoftJson(
    options=>options.SerializerSettings.ContractResolver=new DefaultContractResolver());

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
    options.AddPolicy("KitchenStaff", policy => policy.RequireRole("KitchenStaff"));
    options.AddPolicy("Waiter", policy => policy.RequireRole("Waiter"));
    options.AddPolicy("Cashier", policy => policy.RequireRole("Cashier"));
});

var app = builder.Build();

//Enable CORS
app.UseCors(c=>c.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
//app.MapIdentityApi<IdentityUser>();

app.MapControllers();

// Role and User Seeding
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();

    var roles = new[] { "Admin", "KitchenStaff", "Waiter", "Cashier" };
    var userNames = new[] { "admin1", "kitchenStaff1", "waiter1", "cashier1" };
    var emails = new[] { "admin1@gmail.com", "kitchenStaff1@gmail.com", "waiter1@gmail.com", "cashier1@gmail.com" };
    var passwords = new[] { "@Admin1test", "@kitchenStaff1test", "@Waiter1test", "@Cashier1test" };
    var userRoles = new[] { "Admin", "KitchenStaff", "Waiter", "Cashier" };

    foreach (var role in roles)
    {
        try
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                var roleResult = await roleManager.CreateAsync(new IdentityRole(role));
                if (!roleResult.Succeeded)
                {
                    Console.WriteLine($"Failed to create role {role}: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error checking or creating role {role}: {ex.Message}");
        }
    }

    for (int i = 0; i < userNames.Length; i++)
    {
        try
        {
            var existingUser = await userManager.FindByEmailAsync(emails[i]);
            if (existingUser == null)
            {
                var user = new IdentityUser { UserName = userNames[i], Email = emails[i] };
                var userResult = await userManager.CreateAsync(user, passwords[i]);
                if (userResult.Succeeded)
                {
                    var roleResult = await userManager.AddToRoleAsync(user, userRoles[i]);
                    if (roleResult.Succeeded)
                    {
                        Console.WriteLine($"Successfully added {userNames[i]} to {userRoles[i]} role.");
                    }
                    else
                    {
                        Console.WriteLine($"Failed to add {userNames[i]} to {userRoles[i]} role: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                    }
                }
                else
                {
                    Console.WriteLine($"Failed to create user {userNames[i]}: {string.Join(", ", userResult.Errors.Select(e => e.Description))}");
                }
            }
            else
            {
                Console.WriteLine($"User {userNames[i]} already exists.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing user {userNames[i]}: {ex.Message}");
        }
    }
}

app.Run();
