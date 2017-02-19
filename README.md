# flask-socketio-skeleton

This is just a simple bootstrap project to include flask-socketio capabilities to Flask webapps.

The file condalist.txt lists all the requirements. Shouldn't be hard to replicate with or without conda. With conda, I use envExport.yml (with "conda env create" in the command line) and that's the fastest way.

Some packages like eventlet are not strinctly required, but latency is much better in socketIO using eventlet than the current alternatives (gevent and threading). Several times fold faster. To test this, look at the top of app.py where you can manually set async_mode to any of these modes.

The logic on the python side is in app.py. For the browser side look at static/socket_logic.js and templates/index.html - I kept it quite minimal there based on Miguel Grinberg's example.

PS: PyCharm currently supports conda environments, so for interactive debugging you just need to set the project interpreter appropiately after creating the conda environment, and you will be able to go through the server side app within the PyCharm environment seemlessly.
