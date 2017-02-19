$(document).ready(function() {
    // ---------------------- socket logic and main handlers ----------------------
    namespace = '/ns0';
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

    socket.on('connect', function() {
        socket.emit(
                    'my_event', {data: 'connected ' + socket.id });
    });


    socket.on('response0', function(msg) { // response 0 - scheduled background event
        $('#log').append('<br>' + $('<div/>').text('Received scheduled #' + msg.count + ': ' + msg.data).html());
    });

    socket.on('response1', function(msg) { // response 1 - general msg responses
        $('#log').append('<br>' + $('<div/>').text('Received #' + msg.count + ': ' + msg.data).html());
    });


    var ping_pong_times = [];
    var start_time;

    window.setInterval(function() {
                                     start_time = (new Date).getTime();
                                     socket.emit('my_ping');
                                     }, 3000); // in milliseconds


    socket.on('my_pong', function() {
        var latency = (new Date).getTime() - start_time;
        ping_pong_times.push(latency);
        ping_pong_times = ping_pong_times.slice(-100); // keep last 100 samples
        var sum = 0;
        for (var i = 0; i < ping_pong_times.length; i++)
            sum += ping_pong_times[i];
              $('#ping-pong').text((Math.round(100 * sum / ping_pong_times.length) / 100.0) ); //+ ' ('+ping_pong_times.length+' samples)');
    });

    // ---------------------- HANDLERS for form events ----------------------
    $('form#emit').submit(function(event) {
        socket.emit('my_event', {data: $('#emit_data').val()});
        return false;
    });
    $('form#broadcast').submit(function(event) {
        socket.emit('my_broadcast_event', {data: $('#broadcast_data').val()});
        return false;
    });
    $('form#join').submit(function(event) {
        socket.emit('join', {room: $('#join_room').val()});
        return false;
    });
    $('form#leave').submit(function(event) {
        socket.emit('leave', {room: $('#leave_room').val()});
        return false;
    });
    $('form#send_room').submit(function(event) {
        socket.emit('my_room_msg_event', {room: $('#room_name').val(), data: $('#room_data').val()});
        return false;
    });
    $('form#close').submit(function(event) {
        socket.emit('close_room', {room: $('#close_room').val()});
        return false;
    });
    $('form#disconnect').submit(function(event) {
        socket.emit('disconnect_request');
        return false;
    });
});