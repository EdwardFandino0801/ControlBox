using System.ComponentModel.DataAnnotations;

namespace Controlbox.Api.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "El nombre de usuario es obligatorio.")]
        [MaxLength(100, ErrorMessage = "El nombre de usuario no debe superar los 100 caracteres.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "El correo electr�nico es obligatorio.")]
        [EmailAddress(ErrorMessage = "El formato del correo electr�nico no es v�lido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "La contrase�a es obligatoria.")]
        [MinLength(6, ErrorMessage = "La contrase�a debe tener al menos 6 caracteres.")]
        public string Password { get; set; }
    }
}
