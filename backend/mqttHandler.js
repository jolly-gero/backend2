
const mqtt = require('mqtt');

    class MqttHandler {
      constructor() {
        this.mqttClient = null;
        this.host = '203.150.221.207';
        this.port = '1883'
        this.username = ''; 
        this.password = '';
      }

      connect() {

        this.mqttClient = mqtt.connect({
                host : this.host,
                port : this.port,
                username : this.username,
                password : this.password
        });
        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
          console.log(err);
          this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            this.mqttClient.subscribe('#')
            console.log(`mqtt client connected`);

        });


         this.mqttClient.on('close', () => {
           console.log(`mqtt client disconnected`);
         });

         this.mqttClient.on("message", (topic, message) => {
            console.log({
                Topic: topic,
                Payload: message.toString()
            });           
         });

      }

    //   // Sends a mqtt message to topic: mytopic
      sendMessage(topic,message,err) {

            try {
                this.mqttClient.publish(topic,JSON.stringify(message));
            } catch (err) {
                console.log(err);
            }

      }

}

    module.exports = MqttHandler;