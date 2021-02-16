# Enhash GUI Toolkit
Current release: 0.5
For many important files there usually is a signature provided to verify the authenticity of the data and to make sure the files are safe. Right now most tools are not user friendly, have a cluttered interface and are not available in all platforms.

This is an attempt at making file signature verification more accessible and user friendly. Enhash is made with Node.js, Electron.js and Vue.js to create a fast, stable and good looking tool that can be used by everyone with minimal effort. 
## What does it do?

 :heavy_check_mark: Creates a hash from a file or text
 :heavy_check_mark: Creates a hash using an HMAC
 :heavy_check_mark: Verifies the integrity of a file using a hash provided by the user
 :heavy_check_mark: Compares two files to make sure they are identical
 :heavy_check_mark: Encrypts/Decrypts a file (beta) 
## Installation and usage

 1. Download the installer here :package:
 2. Install and run
 3. Once opened select the function you want to perform from the list on the left

:hash: To hash a file:
1. Select the file you want to hash or use text
2. Choose an algorithm
3. If you want to use an HMAC tick  the box and then enter the key 
4. Press start and you are done! :raised_hands:

![enter image description here](https://i.imgur.com/Dw7ONLb.png)

:mag: To verify the integrity of a file or text:
Same as with hashing but you must enter the expected hash of the file that you got from the creator.
![enter image description here](https://i.imgur.com/wizQZ1j.png)
:lock: To encypt/decrypt a file:
1. Select a file
2. Choose if you want to encrypt or decrypt
3. choose an algorithm
4. Set a password
5. Done!

:bangbang: Remember:
1. This will rewrite the target file
2. Do not decrypt an already decrypted file and don't encrypt an encrypted file.
3. Make sure you remember the password and the algorithm used
4. If you see that it is stuck, restart the application and try again. 

![enter image description here](https://i.imgur.com/jTqopMm.png)

## To do:
There a few things that will be changed in future releases

 - More comments on the code
 - Write tests
 - Fix the edge cases with the encryption functionality

## Known issues
:x: If you try decrypting an already decrypted file the application might break
:x: If you try encrypting an already encrypted file the application will break
If you find any bugs make sure you create an issue so that I can try to fix it, or fix it yourself and make a pull request! Also suggestions are welcome!
