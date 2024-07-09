import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;

public class EncriptadorTexto {

    public static void main(String[] args) throws Exception {
        String textoOriginal = "Hola, mundo!";
        SecretKey clave = generarClaveAES();
        
        // Encriptar texto
        String textoEncriptado = encriptar(textoOriginal, clave);
        System.out.println("Texto encriptado: " + textoEncriptado);
        
        // Desencriptar texto
        String textoDesencriptado = desencriptar(textoEncriptado, clave);
        System.out.println("Texto desencriptado: " + textoDesencriptado);
    }

    // Método para generar una clave AES
    public static SecretKey generarClaveAES() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(128); // Puede ser 128, 192 o 256
        return keyGen.generateKey();
    }

    // Método para encriptar texto con AES
    public static String encriptar(String texto, SecretKey clave) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, clave);
        byte[] textoEncriptado = cipher.doFinal(texto.getBytes());
        return Base64.getEncoder().encodeToString(textoEncriptado);
    }

    // Método para desencriptar texto con AES
    public static String desencriptar(String textoEncriptado, SecretKey clave) throws Exception {
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, clave);
        byte[] textoBytes = Base64.getDecoder().decode(textoEncriptado);
        byte[] textoDesencriptado = cipher.doFinal(textoBytes);
        return new String(textoDesencriptado);
    }
}
