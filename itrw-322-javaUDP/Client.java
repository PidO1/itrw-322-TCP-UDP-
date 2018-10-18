import java.io.*;
import java.net.*;

public class Client {
    private DatagramSocket socket = null;
    private FileEvent event = null;
    private String sourceFilePath = "C:/Users/piete/Desktop/itrw-322-TCP-UDP-/itrw-322-javaUDP/test.png";
    private String destinationPath = "C:/Users/EA/Desktop/EA/UTC,TCP repo/itrw-322-TCP-UDP-/itrw-322-javaUDP/test.png";
    private String hostName = "192.168.1.2";

    public Client() {

    }

    public void createConnection() {
        try {
            
           
            socket = new DatagramSocket();
            InetAddress IPAddress = InetAddress.getByName(hostName);
            byte[] incomingData = new byte[1024];
            event = getFileEvent();
            
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ObjectOutputStream os = new ObjectOutputStream(outputStream);
            long startTime = System.currentTimeMillis();
            long elapsedTime;
            os.writeObject(event);
            byte[] data = outputStream.toByteArray();
            DatagramPacket sendPacket = new DatagramPacket(data, data.length, IPAddress, 5644);
            socket.send(sendPacket);
            System.out.println("File sent from client");
            DatagramPacket incomingPacket = new DatagramPacket(incomingData, incomingData.length);
            socket.receive(incomingPacket);
            String response = new String(incomingPacket.getData());
            elapsedTime = System.currentTimeMillis() - startTime;
        System.out.println(elapsedTime);
            System.out.println("Response from server:" + response);
            
            Thread.sleep(2000);
            System.exit(0);
            

        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (SocketException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public FileEvent getFileEvent() {
        long startTime = System.currentTimeMillis();
            long elapsedTime;
        FileEvent fileEvent = new FileEvent();
        String fileName = sourceFilePath.substring(sourceFilePath.lastIndexOf("/") + 1, sourceFilePath.length());
        String path = sourceFilePath.substring(0, sourceFilePath.lastIndexOf("/") + 1);
        fileEvent.setDestinationDirectory(destinationPath);
        fileEvent.setFilename(fileName);
        fileEvent.setSourceDirectory(sourceFilePath);
        File file = new File(sourceFilePath);
        if (file.isFile()) {
            try {
                DataInputStream diStream = new DataInputStream(new FileInputStream(file));
                long len = (int) file.length();
                byte[] fileBytes = new byte[(int) len];
                int read = 0;
                int numRead = 0;
                while (read < fileBytes.length
                        && (numRead = diStream.read(fileBytes, read, fileBytes.length - read)) >= 0) {
                    read = read + numRead;
                }
                fileEvent.setFileSize(len);
                fileEvent.setFileData(fileBytes);
                fileEvent.setStatus("Success");
            } catch (Exception e) {
                e.printStackTrace();
                fileEvent.setStatus("Error");
            }
        } else {
            System.out.println("path specified is not pointing to a file");
            fileEvent.setStatus("Error");
        }
        elapsedTime = System.currentTimeMillis() - startTime;
        System.out.println(elapsedTime+" xx");
        return fileEvent;
    }

    public static void main(String[] args) {
        Client client = new Client();
        client.createConnection();
    }
}