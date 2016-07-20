# wanderlust_reader
Prime Solo Project Wanderlust Comic Reader
Margaret Culotta

See the Demo here:
https://shielded-hollows-78001.herokuapp.com/

6/27/2016 | Version 0.1

Application Overview:
Wanderlust Comic Reader is a MEAN-stack web application that allows digital access to Wanderlust Comics.  It allows the reader to read graphic novels by issue either page-by-page or panel-by-panel. It gives the reader the ability to zoom in on the artwork to view detail and  it allows exclusive access to illustrator and writer commentary. The aesthetic of the reader will be consistent with the branding of Wanderlust Comics Group. This includes the use of custom drawn buttons.

Application Features:

Library Dashboard-
Shows the graphic novels that are available to the reader broken down by issue.
Each Issue will be entered into the database individually. If the stretch goal of an administrator mode is completed, the entry of new issues can be done from the administrator mode.


Viewer and Toolbar-
After selecting the issue to read, the reader is taken to a viewing page where they can read the issue in page-by-page mode or panel-by-panel mode. The viewing page will have a static tool-bar that will allow them access to tools (previous, next, library, writer/illustrator notes). If the reader is in page-by-page mode, they will be able to click on a button and begin viewing in panel-by-panel mode. When they clicked outside of the gallery of panels, the gallery window will close.

Commentary-
The reader can turn on the commentary mode. This indicates when an illustrator or writer note is available on a specific panel or page and will indicate that the note is available by showing an icon that the reader can then click to view the note, click off the popup to close the comment.

Login-
Allows secure access to the Wanderlust Comics Group material. Before the user logs in, they must provide a username and password that have been set by the administrator.  Because the Wanderlust Comics Group would like to control access for the time being, there will not be a registration page. I will be using passport for authentication.



Technologies
Node
Express
Angular
MongoDB
Heroku
