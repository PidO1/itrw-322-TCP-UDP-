/* File Client *********************************************************/

import java.io.*;
import java.net.*;
import java.util.Timer;


public class fileclient{
public static void main(String[] argv) throws Exception {
    long startTime = System.currentTimeMillis();
    long elapsedTime;
byte []b=new byte[2002];
Socket sr=new Socket("localhost",5643);
InputStream is=sr.getInputStream();
FileOutputStream fr=new FileOutputStream("C:/Users/User/Desktop/test/testing.txt");
is.read(b,0,b.length);
fr.write(b, 0, b.length);

elapsedTime = System.currentTimeMillis() - startTime ;
    System.out.println(elapsedTime);
}
}