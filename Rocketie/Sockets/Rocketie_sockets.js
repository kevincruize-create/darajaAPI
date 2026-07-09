const express = require('express');
//const app = express();


const process = (app, io) => {

const Room = 300;
 const array = [];
//const array = [];
//const array = [];
//console.log('hello')

io.on('connection', (socket) => {

  //console.log('hello')
  console.log('User connected:', socket.id);

  io.emit('array_check', array);

  socket.on('push_array', (data) => {

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

    if(!user)
    {
         array.push({
         name: data.sender,
         myID: data.myID,
         room: data.room,
         attacker:'',
         health:100,
         damage:'',
         status:'',
         coins:0

        });
    }
    else
    {
       console.log('exists')
    }

    const number = array.find(item => item.room === data.room);

   console.log('updated array', array) 
   console.log('players', number.length)

  })

    // Receive message from client
  socket.on('update_loss', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    console.log('bomb')

    const user = array.find(item => item.myID === data.myID);

     if (user) {
         
         user.status = 'loose'
         console.log('loss', array)

     }


    io.emit('array', array);

 
  });

  

  // Receive message from client
  socket.on('bomb_message', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    console.log('bomb')

    const user = array.find(item => item.ID === data.victim);

     if (user) {
        user.damage = 'bomb';
        user.attacker = data.sender;
        user.health = user.health - 50
     }


    

    // emit player array

    io.emit('bomb', data);
    io.emit('array', array);
  });



    // Receive message from client
  socket.on('freeze_controls', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.victim);

     if (user) {
        user.damage = 'freeze_controls';
        user.attacker = data.sender;
     }
 
     console.log('freeze_controls', data.victim)

    io.emit('freeze_controls', data);

  });

      // Receive message from client
  socket.on('update_health', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.game_room === data.room);

     if (user) {
      
         user.health = data.health;
         //console.log('health')
         io.emit('array', array);
        
     }

    //console.log(data.room, data.myID)

   //  io.emit('array', array);


   // io.emit('freeze_controls', data);

  });


      // Receive message from client
  socket.on('take_coins', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.
  console.log('coin data',data)
  console.log('array', array)

    const user = array.find(item => item.myID === data.victim);

     if (user) {
        user.damage = 'take_coins';
        user.attacker = data.attacker;

            console.log('take coins', data)//
            io.emit('receive_coins', data);
            io.emit('array', array);
     }



  });

  socket.on('update_coins', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.game_room === data.room);

     if (user) {
        
        
        user.coins = data.coins + 5;
        console.log('coins update')
       
     }

     //console.log('coins')
    io.emit('array', array);

  });

  




  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

   });
});
    


}


module.exports = process;
