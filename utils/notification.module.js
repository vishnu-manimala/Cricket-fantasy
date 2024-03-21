function initializeNotificationModule(io){

    io.on('connection',(socket) => {
        console.log('A user connected');
        socket.on( 'new_notification', function( data ) {
            console.log(data.title,data.message);
            io.sockets.emit( 'show_notification', { 
              title: data.title, 
              message: data.message, 
              icon: data.icon, 
            });
          });
          socket.on('disconnect', () => {
            console.log('A user disconnected');
          });
    })
}

module.exports = {
    initializeNotificationModule,
  };