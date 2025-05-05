using System.ComponentModel.DataAnnotations;

namespace Controlbox.Api.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "El correo electr�nico es obligatorio.")]
        [EmailAddress(ErrorMessage = "El formato del correo electr�nico no es v�lido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "La contrase�a es obligatoria.")]
        [MinLength(6, ErrorMessage = "La contrase�a debe tener al menos 6 caracteres.")]
        public string Password { get; set; }
    }
}
