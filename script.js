// FUNGSI ENKRIPSI
function Encrypt(key, text) {
    var S = [];
    var K = [];
    var cipher = '';
    
    // TAHAP 1 : Inisialisasi S-box
    for (var i = 0; i < 256; i++) {
        S[i] = i;
        K[i] = key.charCodeAt(i % key.length);
    }
    
    // TAHAP 2 : inisialisasi KSA (Key Scheduling Algorithm)
    var j = 0;
    for (var i = 0; i < 256; i++) {
        j = (j + S[i] + K[i]) % 256;
        // Swap S[i] dan S[j]
        var temp = S[i];
        S[i] = S[j];
        S[j] = temp;
    }
    
    // TAHAP 3 : Proses PRGA (Pseudo-Random Generation Algorithm)
    var i = 0;
    j = 0;
    for (var n = 0; n < text.length; n++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        var temp = S[i];
        S[i] = S[j];
        S[j] = temp;
        var K = S[(S[i] + S[j]) % 256];
        cipher += String.fromCharCode(text.charCodeAt(n) ^ K);
    }
    return cipher;
}

//FUNGSI DEKRIPSI
function Decrypt(key, encryptedText) {
    var S = [];
    var K = [];
    var decryptedText = '';

    // TAHAP 1 : Inisialisasi S-box
    for (var i = 0; i < 256; i++) {
        S[i] = i;
        K[i] = key.charCodeAt(i % key.length);
    }

    // TAHAP 2 : inisialisasi KSA (Key Scheduling Algorithm)
    var j = 0;
    for (var i = 0; i < 256; i++) {
        j = (j + S[i] + K[i]) % 256;
        // Swap S[i] dan S[j]
        var temp = S[i];
        S[i] = S[j];
        S[j] = temp;
    }

    // TAHAP 3 : Proses PRGA (Pseudo-Random Generation Algorithm)
    var i = 0;
    j = 0;
    for (var n = 0; n < encryptedText.length; n++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        var temp = S[i];
        S[i] = S[j];
        S[j] = temp;
        var K = S[(S[i] + S[j]) % 256];
        decryptedText += String.fromCharCode(encryptedText.charCodeAt(n) ^ K);
    }

    return decryptedText;
}   

// FUNGSI BUTTON ECNCRYPT / DECRYPT
function encryptdecrypt() {
    var key = document.getElementById("key").value;
    var text = document.getElementById("text").value;
    var result = document.getElementById("result");
    result.value = Encrypt(key, text);
}

// FUNGSI BUTTON CLEAR
function clearFields() {
    document.getElementById("text").value = "";
    document.getElementById("key").value = "";
    document.getElementById("result").value = "";
}
