using Microsoft.AspNetCore.Mvc;
using Controlbox.Api.DTOs;
using Controlbox.Api.Services;

namespace Controlbox.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var (token, user) = await _authService.AuthenticateAsync(loginDto);

                return Ok(new
                {
                    token,
                    id = user.Id,
                    username = user.Username
                });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Credenciales inválidas.");
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                var newUser = await _authService.RegisterAsync(registerDto);
                return Ok(new
                {
                    message = "Usuario registrado con éxito",
                    user = new { newUser.Id, newUser.Username, newUser.Email }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // No se hace nada en el backend con JWT stateless, pero se puede borrar del lado cliente.
            return Ok(new { message = "Cierre de sesión exitoso." });
        }
    }
}
