const express = require('express');
//const app = express();
const send_player_update = require("./update_room_players");

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
         victim: data.victim,
         health:100,
         damage:'',
         status:'',
         coins:data.coins,
         win:'',
         shield:'',
         socketId: socket.id,
         eliminations: 0,
         eliminated:'no',
         Spins:''
        });
            //console.log(playersInRoom.length);
         const getPlayersInRoom = (room) => {
              return array.filter(player => String(player.room) === String(room));
          };

          io.to(data.room).emit('array', getPlayersInRoom(data.room));
       

          console.log('updated array', array) 

          console.log('room', data.room)
         
           
    }
    else
    {
         console.log('exists')
            
    
     
         const user = array.find(item => item.room === data.room && item.myID === data.myID);
         if(user)
         {
           
            user.eliminated = 'no';
            user.victim = data.victim;
               const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
            console.log('room', data.room)
            
         }

    //  console.log('updated array', array)  //
    }

    const playersInRoom = array.filter(item => item.room === data.room);

    if(playersInRoom.length >= 2)
    {
        console.log('yes it is 2')
     
       playersInRoom.forEach(player => {
          player.win = 'eligible';
       });

      //console.log(playersInRoom.length);
      const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));

  //   console.log('updated array', array) 
    }



  })

    // Receive message from client
    socket.on('update_spins', (data) => {
     console.log('revenge data', data.room)
     
     const user = array.find(item => item.myID === data.myID && item.room === data.room);
     if(user)
     {
            user.Spins = data.Spins;
            user.coins = data.coins;
            const getPlayersInRoom = (room) =>{
                 return array.filter(player => String(player.room) === String(room));
            };

            io.to(data.room).emit('spin_sound', data);
            io.to(data.room).emit('array', getPlayersInRoom(data.room));
     }
    
    });

  socket.on('update_loss', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

   const player = array.find(item => item.name === data.attacker);

       if (player) 
       {
              
          player.eliminations = player.eliminations + 1;  
          console.log('update elimination', array)
            const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
        
              const user = array.find(item => item.myID === data.myID && item.room === data.room);

               if (user) {
         
                  //user.status = 'loose'
                 //console.log('loss', array)
                 io.to(data.room).emit('eliminator', data);
                 array.splice(user, 1);
                 console.log('loss', array)
                  const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
               //  io.to(data.room).emit('array', array);

               }

        
      }

       else{
                console.log('not found', data.attacker)
        
       }

    

 
  });

  

  // Receive message from client
  socket.on('bomb_message', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    

    const user = array.find(item => item.myID === data.victim && item.room === data.room);
    // console.log('bomb', data.room)
     if (user) {

        console.log('bomb victim exists')
        user.damage = 'bomb';
        user.attacker = data.sender;
        user.health = user.health - 50
        user.victim_name = data.victim_name
           // emit player array
        console.log('bomb', array)
           const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
        io.to(data.room).emit('bomb', data);
        //io.to(data.room).emit('array', getPlayersInRoom(data.room));
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

       
              const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
       console.log('eliminated is yes')
     }
    
    });
     
     socket.on('update_eliminated_vengence', (data) => {
     console.log('revenge data', data.room)
     
     const user = array.find(item => item.room === data.room && item.myID === data.myID);
     if(user)
     {
       user.eliminated = 'yes';
              const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
       console.log('eliminated is yes for vengence')
     }
    
    });
 
    socket.on('update_eliminated_new', (data) => {
     console.log('revenge data', data.room)
     
     const user = array.find(item => item.room === data.room && item.myID === data.myID);
     if(user)
     {
       user.eliminated = 'no';
              const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
       console.log('eliminated is no')
     }
    
    });
 

    socket.on('revenge_data', (data) => {
     console.log('revenge data', data.room)
     
     const user = array.find(item => item.room === data.room);
     if(user)
     {
              const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
     }
    
    });

   socket.on('unfreeze', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
         user.damage = '';
                const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
     }
 


  });


   socket.on('eliminate_attacker', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
        user.attacker = '';
        user.health = data.health;
        io.to(data.room).emit('delete_array', data);
               const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
     }
 


  });


     // Receive message from client
  socket.on('shield', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
        user.shield = 'on';
       
          const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
     }
 


  });

   socket.on('shield_off', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
        user.shield = 'off';
       
          const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
     }
 


  });

     // Receive message from client
  socket.on('reward_attacker', (data) => {

   io.to(data.room).emit('rewards', data);
       const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
  });

 
    // Receive message from client
  socket.on('freeze_controls', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.
    console.log('freeze_controls', data.victim)

    const user = array.find(item => item.myID === data.victim && item.room === data.room);

     if (user) {
        user.damage = 'freeze_controls';
        user.attacker = data.sender;
        user.victim_name = data.victim_name
        console.log('freeze_controls_room', data.victim)
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

        const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
        };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
    
        
     }



               
  

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
              const getPlayersInRoom = (room) => {
                   return array.filter(player => String(player.room) === String(room));
                  };

                io.to(data.room).emit('array', getPlayersInRoom(data.room));
     }



  });

  socket.on('update_coins', (data) => {

    // update where array contains the details of the enemy then send data to that enemy.

    const user = array.find(item => item.myID === data.myID && item.room === data.room);

     if (user) {
        
        
        user.coins = data.coins + 5;
        const getPlayersInRoom = (room) => {
           return array.filter(player => String(player.room) === String(room));
        };

        io.to(data.room).emit('array', getPlayersInRoom(data.room));
    
     }
              


  });

  




socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    const index = array.findIndex(
        p => p.socketId === socket.id
    );

    if (index !== -1) {

        // Get the room BEFORE removing the player
        const room = array[index].room;

        // Remove the disconnected player
        array.splice(index, 1);

        console.log('Disconnected player was in room:', room);

        let type = 'minus';

        send_player_update(app, type, room);
    }

});
});



}


module.exports = process;
