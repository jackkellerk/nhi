package edu.lehigh.nhi.multitouch.backend;

import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Hashtable;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class Encryption {
    // // Interations of SHA1 hasing.
    // public static final int ITERATIONS = 1000;
    // // Results length in bits.
    // public static final int HASH_LENGTH = 64 * 8;
    // public static final int SALT_LENGTH = 64;
    public static final int SESSION_KEY_LENGTH = 128;

    // static class EncryptResult {
    //     private byte[] mHashedPassword;
    //     private byte[] mSalt;

    //     // Methods in this class are the only place to generate an EncryptResult, so the
    //     // constructor is private.
    //     private EncryptResult(byte[] hashedPassword, byte[] salt) {
    //         mHashedPassword = hashedPassword;
    //         mSalt = salt;
    //     }

    //     public byte[] getHashedPassword() {
    //         return mHashedPassword;
    //     }

    //     public byte[] getSalt() {
    //         return mSalt;
    //     }
    // }

    private Hashtable<Integer, String> sessionKeyTable;

    private static Encryption INSTANCE;

    private Encryption() {
        sessionKeyTable = new Hashtable<>();
        //TODO: remove this in the final production
        sessionKeyTable.put(8, "test_session_key");
    }

    public static Encryption getEncryption() {
        if (INSTANCE == null) {
            INSTANCE = new Encryption();
        }
        return INSTANCE;
    }

    synchronized boolean checkSessionKey(Integer uid, String sessionKey) {
        if (sessionKey == null) {
            return false;
        }
        if (!sessionKeyTable.containsKey(uid)) {
            return false;
        }
        if (!sessionKey.equals(sessionKeyTable.get(uid))) {
            return false;
        }
        return true;
    }

    synchronized String addSessionkey(Integer uid) throws NoSuchAlgorithmException {
        if (uid == null) {
            return null;
        }
        String sessionKey = getRandomSessionKey();
        // hashmap will automatically replace the previous sessionKey, so no need for
        // test here.
        sessionKeyTable.put(uid, sessionKey);
        return sessionKey;
    }

    synchronized boolean removeSessionKey(Integer uid) {
        if (uid == null) {
            return false;
        }
        if (!sessionKeyTable.containsKey(uid)) {
            return false;
        }
        sessionKeyTable.remove(uid);
        return true;
    }

    // static EncryptResult generateStorngPasswordHash(String password)
    //         throws NoSuchAlgorithmException, InvalidKeySpecException {
    //     char[] chars = password.toCharArray();
    //     byte[] salt = getSafeRandom(SALT_LENGTH);
    //     PBEKeySpec spec = new PBEKeySpec(chars, salt, ITERATIONS, HASH_LENGTH);
    //     SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
    //     byte[] hash = skf.generateSecret(spec).getEncoded();
    //     return new EncryptResult(hash, salt);
    // }

    private static String getRandomSessionKey() throws NoSuchAlgorithmException {
        byte[] rand = getSafeRandom(SESSION_KEY_LENGTH);
        return toHex(rand);
    }

    private static byte[] getSafeRandom(int bytes) throws NoSuchAlgorithmException {
        SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
        byte[] salt = new byte[bytes];
        sr.nextBytes(salt);
        return salt;
    }

    private static String toHex(byte[] array) throws NoSuchAlgorithmException {
        BigInteger bi = new BigInteger(1, array);
        String hex = bi.toString(16);
        int paddingLength = (array.length * 2) - hex.length();
        if (paddingLength > 0) {
            return String.format("%0" + paddingLength + "d", 0) + hex;
        } else {
            return hex;
        }
    }

}