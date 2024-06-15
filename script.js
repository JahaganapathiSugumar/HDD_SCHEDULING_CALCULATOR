function showAlgorithm() {
    const algorithm = document.getElementById('algorithm').value;
    let description = '';

    switch (algorithm) {
        case 'fcfs':
            description = 'First Come First Serve (FCFS) scheduling algorithm.';
            document.getElementById('direction-container').style.display = 'none';
            break;
        case 'sstf':
            description = 'Shortest Seek Time First (SSTF) scheduling algorithm.';
            document.getElementById('direction-container').style.display = 'none';
            break;
        case 'scan':
            description = 'SCAN scheduling algorithm.';
            document.getElementById('direction-container').style.display = 'block';
            break;
        case 'cscan':
            description = 'Circular SCAN (C-SCAN) scheduling algorithm.';
            document.getElementById('direction-container').style.display = 'none';
            break;
        case 'look':
            description = 'LOOK scheduling algorithm.';
            document.getElementById('direction-container').style.display = 'block';
            break;
        case 'clook':
            description = 'Circular LOOK (C-LOOK) scheduling algorithm.';
            document.getElementById('direction-container').style.display = 'none';
            break;
        default:
            document.getElementById('direction-container').style.display = 'none';
    }

    document.getElementById('algorithm-description').innerText = description;
}

function simulate(event) {
    event.preventDefault();

    const algorithm = document.getElementById('algorithm').value;
    const requestsInput = document.getElementById('requests').value;
    const headInput = document.getElementById('head').value;
    const diskSizeInput = document.getElementById('disk-size').value;
    const directionInput = document.getElementById('direction').value;

    const requests = requestsInput.split(',').map(Number);
    const head = Number(headInput);
    const diskSize = Number(diskSizeInput);

    const invalidRequests = requests.filter(request => request >= diskSize);
    if (invalidRequests.length > 0) {
        alert(`Invalid requests found: ${invalidRequests.join(', ')}. All requests must be within the disk size range.`);
        return;
    }

    const validRequests = requests.filter(request => request < diskSize);

    let result;
    let movements = [];

    switch (algorithm) {
        case 'fcfs':
            result = fcfs(validRequests, head, movements);
            break;
        case 'scan':
            result = scan(validRequests, head, movements, diskSize, directionInput);
            break;
        case 'cscan':
            result = cscan(validRequests, head, movements, diskSize);
            break;
        case 'look':
            result = look(validRequests, head, movements, diskSize, directionInput);
            break;
        case 'clook':
            result = clook(validRequests, head, movements, diskSize);
            break;
        case 'sstf':
        default:
            result = sstf(validRequests, head, movements, diskSize);
            break;
    }

    sessionStorage.setItem('algorithm', algorithm);
    sessionStorage.setItem('requests', requestsInput);
    sessionStorage.setItem('head', headInput);
    sessionStorage.setItem('diskSize', diskSizeInput);
    sessionStorage.setItem('direction', directionInput);

    sessionStorage.setItem('result', result);
    sessionStorage.setItem('movements', JSON.stringify(movements));

    window.location.href = 'results.html';
}

function fcfs(requests, head, movements) {
    let totalMovement = 0;
    let currentHead = head;

    requests.forEach(request => {
        totalMovement += Math.abs(currentHead - request);
        movements.push(request);
        currentHead = request;
    });

    return totalMovement;
}

function sstf(requests, head, movements) {
    let totalMovement = 0;
    let currentHead = head;
    let pendingRequests = [...requests];

    while (pendingRequests.length > 0) {
        let nearestRequest = pendingRequests.reduce((nearest, request) => {
            return (Math.abs(currentHead - request) < Math.abs(currentHead - nearest)) ? request : nearest;
        });

        totalMovement += Math.abs(currentHead - nearestRequest);
        movements.push(nearestRequest);
        currentHead = nearestRequest;
        pendingRequests = pendingRequests.filter(request => request !== nearestRequest);
    }

    return totalMovement;
}

function scan(requests, head, movements, diskSize, direction) {
    let totalMovement = 0;
    let currentHead = head;
    let sortedRequests = [...requests].sort((a, b) => a - b);

    if (direction === 'forward') {
        let index = sortedRequests.findIndex(request => request >= head);

     
        for (let i = index; i < sortedRequests.length; i++) {
            totalMovement += Math.abs(currentHead - sortedRequests[i]);
            movements.push(sortedRequests[i]);
            currentHead = sortedRequests[i];
        }

        
        for (let i = index - 1; i >= 0; i--) {
            totalMovement += Math.abs(currentHead - sortedRequests[i]);
            movements.push(sortedRequests[i]);
            currentHead = sortedRequests[i];
        }
    } else {
        let index = sortedRequests.findIndex(request => request >= head);

      
        for (let i = index - 1; i >= 0; i--) {
            totalMovement += Math.abs(currentHead - sortedRequests[i]);
            movements.push(sortedRequests[i]);
            currentHead = sortedRequests[i];
        }

        
        for (let i = index; i < sortedRequests.length; i++) {
            totalMovement += Math.abs(currentHead - sortedRequests[i]);
            movements.push(sortedRequests[i]);
            currentHead = sortedRequests[i];
        }
    }

    return totalMovement;
}

function cscan(requests, head, movements, diskSize) {
    let totalMovement = 0;
    let currentHead = head;
    let sortedRequests = [...requests].sort((a, b) => a - b);

    let index = sortedRequests.findIndex(request => request >= head);

    
    for (let i = index; i < sortedRequests.length; i++) {
        totalMovement += Math.abs(currentHead - sortedRequests[i]);
        movements.push(sortedRequests[i]);
        currentHead = sortedRequests[i];
    }

    
    totalMovement += Math.abs(currentHead - (diskSize - 1));
    currentHead = 0;
    totalMovement += diskSize - 1;

   
    for (let i = 0; i < index; i++) {
        totalMovement += Math.abs(currentHead - sortedRequests[i]);
        movements.push(sortedRequests[i]);
        currentHead = sortedRequests[i];
    }

    return totalMovement;
}

function look(requests, head, movements, diskSize, direction) {
    let totalMovement = 0;
    let currentHead = head;
    let sortedRequests = [...requests].sort((a, b) => a - b);

    if (direction === 'forward') {
        let index = sortedRequests.findIndex(request => request >= head);

    
        for (let i = index; i < sortedRequests.length; i++) {
            totalMovement += Math.abs(currentHead - sortedRequests[i]);
            movements.push(sortedRequests[i]);
            currentHead = sortedRequests[i];
        }

        
        for (let i = index - 1; i >= 0; i--) {
            totalMovement += Math.abs(currentHead - sortedRequests[i]);
            movements.push(sortedRequests[i]);
            currentHead = sortedRequests[i];
        }
    } else {
        let index = sortedRequests.findIndex(request => request >= head);

        
        for (let i = index - 1; i >= 0; i--) {
            totalMovement += Math.abs(currentHead - sortedRequests[i]);
            movements.push(sortedRequests[i]);
            currentHead = sortedRequests[i];
        }

     
        for (let i = index; i < sortedRequests.length; i++) {
            totalMovement += Math.abs(currentHead - sortedRequests[i]);
            movements.push(sortedRequests[i]);
            currentHead = sortedRequests[i];
        }
    }

    return totalMovement;
}

function clook(requests, head, movements, diskSize) {
    let totalMovement = 0;
    let currentHead = head;
    let sortedRequests = [...requests].sort((a, b) => a - b);

    let index = sortedRequests.findIndex(request => request >= head);


    for (let i = index; i < sortedRequests.length; i++) {
        totalMovement += Math.abs(currentHead - sortedRequests[i]);
        movements.push(sortedRequests[i]);
        currentHead = sortedRequests[i];
    }


    totalMovement += Math.abs(currentHead - sortedRequests[0]);
    currentHead = sortedRequests[0];

  
    for (let i = 0; i < index; i++) {
        totalMovement += Math.abs(currentHead - sortedRequests[i]);
        movements.push(sortedRequests[i]);
        currentHead = sortedRequests[i];
    }

    return totalMovement;
}

document.addEventListener("DOMContentLoaded", function() {
  
    const algorithm = sessionStorage.getItem('algorithm');
    const requests = sessionStorage.getItem('requests');
    const head = sessionStorage.getItem('head');
    const diskSize = sessionStorage.getItem('diskSize');
    const direction = sessionStorage.getItem('direction');

    if (algorithm) {
        document.getElementById('algorithm').value = algorithm;
        showAlgorithm(); // Show direction container if necessary
    }
    if (requests) {
        document.getElementById('requests').value = requests;
    }
    if (head) {
        document.getElementById('head').value = head;
    }
    if (diskSize) {
        document.getElementById('disk-size').value = diskSize;
    }
    if (direction) {
        document.getElementById('direction').value = direction;
    }
});
