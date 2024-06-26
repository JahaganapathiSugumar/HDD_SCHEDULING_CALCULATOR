# HDD_SCHEDULING
This web application simulates various disk scheduling algorithms (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK). Users input disk requests, initial head position, and disk size. The app calculates total head movement and visualizes the results with a line graph. Built with HTML, CSS, JavaScript.
Features
Algorithm Selection: Users can select from several disk scheduling algorithms:

First-Come, First-Served (FCFS)
Shortest Seek Time First (SSTF)
SCAN
Circular SCAN (C-SCAN)
LOOK
Circular LOOK (C-LOOK)
User Input: Users can input the disk requests, the initial position of the disk head, and the size of the disk.

Simulation and Results: The simulation calculates the total head movement and displays the sequence of movements for the selected algorithm. Results are displayed on a separate page for better visualization.

Graphical Representation: The results page includes a line graph that visualizes the movement of the disk head across different requests.

Technologies Used
HTML: For structuring the web pages.
CSS: For styling the application.
JavaScript: For implementing the simulation logic and interactivity.
Chart.js: For rendering the line graph on the results page.

Disk Scheduling Algorithms
First-Come, First-Served (FCFS)
The FCFS algorithm processes disk requests in the order they arrive, without reordering for efficiency.

Shortest Seek Time First (SSTF)
The SSTF algorithm selects the disk request that is closest to the current head position, minimizing seek time.

SCAN
The SCAN algorithm moves the disk head towards one end of the disk, servicing requests along the way, then reverses direction at the end.

Circular SCAN (C-SCAN)
The C-SCAN algorithm is similar to SCAN but only services requests in one direction, returning to the beginning without servicing requests on the return trip.

LOOK
The LOOK algorithm is similar to SCAN but reverses direction at the last request rather than at the disk end.

Circular LOOK (C-LOOK)
The C-LOOK algorithm is similar to C-SCAN but returns to the first request rather than the disk end after servicing all requests in one direction.

website : https://hdd-scheduling-calculator.netlify.app/
