
/* File Client *********************************************************/

import java.io.*;
import java.net.*;
import java.util.Timer;

public class fileclient {
    public static void main(String[] argv) throws Exception {
        long startTime = System.currentTimeMillis();
        long elapsedTime;
        byte[] b = new byte[100000];
        Socket sr = new Socket("192.168.1.7", 5643);
        InputStream is = sr.getInputStream();
        FileOutputStream fr = new FileOutputStream(
                "C:/Users/EA/Desktop/EA/UTC,TCP repo/itrw-322-TCP-UDP-/itrw322-javaTCP/test.png");
        is.read(b, 0, b.length);
        fr.write(b, 0, b.length);

        elapsedTime = System.currentTimeMillis() - startTime;
        System.out.println(elapsedTime);
    }
}