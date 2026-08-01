const express = require('express');
//const app = express();


const process = (app, io) => {

const room = 6;
 const array = [];
//const array = [];
//const array = [];
//console.log('hello')

io.on('connection', (socket) => {

  //console.log('hello')
  console.log('User connected:', socket.id);

    socket.on("join_game", (room) => {
        socket.join(room);
        console.log('room join', room)
    });

  socket.on('check_arr_number', (data) => {

      io.to(data.room).emit('array', array);
    
   });

  socket.on('push_array', (data) => {

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

    if(!user)
    {
         array.push({
         name: data.sender,
         myID: data.myID,
         room: data.room,
         attacker:'',
         victim_name:'',
         victim: '',
         health:100,
         damage:'',
         status:'',
         coins:data.coins,
         win:'',
         shield:'',
         socketId: socket.id,
         eliminations: 0,
         eliminated:'no'
        });
            //console.log(playersInRoom.length);
           io.to(data.room).emit('array', array);

           console.log('updated array', array) 
    }
    else
    {
         console.log('exists')
         const user = array.find(item => item.room === data.room && item.myID === data.myID);
         if(user)
         {
            user.eliminated = 'no';
            io.to(data.room).emit('array', array);
            
         }

       console.log('updated array', array) 
    }

    const playersInRoom = array.filter(item => item.room === data.room);

    if(playersInRoom.length >= 2)
    {
        console.log('yes it is 2')
     
       playersInRoom.forEach(player => {
          player.win = 'eligible';
       });

      //console.log(playersInRoom.length);
     io.to(data.room).emit('array', array);

     console.log('updated array', array) 
    }



  })

    // Receive message from client
  socket.on('update_loss', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

   const player = array.find(item => item.name === data.attacker);

       if (player) 
       {
              
          player.eliminations = player.eliminations + 1;  
          console.log('update elimination', array)
          io.to(data.room).emit('array', array);
        
              const user = array.find(item => item.myID === data.myID && item.room === data.room);

               if (user) {
         
                  //user.status = 'loose'
                 //console.log('loss', array)
                 io.to(data.room).emit('eliminator', data);
                 array.splice(user, 1);
                 console.log('loss', array)
                 io.to(data.room).emit('array', array);

               }
      }

       else{
                console.log('not found', data.attacker)
        
       }

    

 
  });

  

  // Receive message from client
  socket.on('bomb_message', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    

    const user = array.find(item => item.myID === data.victim);
    // console.log('bomb', data.room)
     if (user) {

        console.log('bomb victim exists')
        user.damage = 'bomb';
        user.attacker = data.sender;
        user.health = user.health - 50
        user.victim_name = data.victim_name
           // emit player array
        console.log('bomb', array)
        io.to(data.room).emit('bomb', data);
        io.to(data.room).emit('array', array);
     }
     else{
        console.log('bomb victim no exists')
     }


    


  });


    socket.on('update_eliminated', (data) => {
     console.log('revenge data', data.room)
     
     const user = array.find(item => item.room === data.room && item.myID === data.myID);
     if(user)
     {
       user.eliminated = 'yes';

       io.to(data.room).emit('exit', data);
      
       io.to(data.room).emit('array', array);
       console.log('eliminated is yes')
     }
    
    });

    socket.on('update_eliminated_new', (data) => {
     console.log('revenge data', data.room)
     
     const user = array.find(item => item.room === data.room && item.myID === data.myID);
     if(user)
     {
       user.eliminated = 'no';
       io.to(data.room).emit('array', array);
       console.log('eliminated is no')
     }
    
    });
 

    socket.on('revenge_data', (data) => {
     console.log('revenge data', data.room)
     
     const user = array.find(item => item.room === data.room);
     if(user)
     {
       io.to(data.room).emit('array', array);
     }
    
    });

   socket.on('unfreeze', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
         user.damage = '';
         io.to(data.room).emit('array', array);
     }
 


  });


   socket.on('eliminate_attacker', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
        user.attacker = '';
        user.health = data.health;
        io.to(data.room).emit('delete_array', data);
        io.to(data.room).emit('array', array);
     }
 


  });


     // Receive message from client
  socket.on('shield', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
        user.shield = 'on';
       
        io.to(data.room).emit('array', array);
     }
 


  });

   socket.on('shield_off', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
        user.shield = 'off';
       
        io.to(data.room).emit('array', array);
     }
 


  });

     // Receive message from client
  socket.on('reward_attacker', (data) => {
     io.to(data.room).emit('rewards', data);
  });

 
    // Receive message from client
  socket.on('freeze_controls', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.victim);

     if (user) {
        user.damage = 'freeze_controls';
        user.attacker = data.sender;
        user.victim_name = data.victim_name
        console.log('freeze_controls', data.victim)
        io.to(data.room).emit('freeze_controls', data);
     }
 
  });

      // Receive message from client
  socket.on('update_health', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
      
         user.health = data.health;
         //console.log('health')
    
        
     }

    //console.log(data.room, data.myID)

   //  io.emit('array', array);

        io.to(data.room).emit('array', array);
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
            io.to(data.room).emit('receive_coins', data);
            io.to(data.room).emit('array', array);
     }



  });

  socket.on('update_coins', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
        
        
        user.coins = data.coins + 5;
      //  console.log('coins update')
             //console.log('coins')
    
     }
        io.to(data.room).emit('array', array);


  });

  




  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    const index = array.findIndex(
        p => p.socketId === socket.id
    );

    if(index !== -1){
        array.splice(index,1);
    }

   });
});
    


}


module.exports = process;
