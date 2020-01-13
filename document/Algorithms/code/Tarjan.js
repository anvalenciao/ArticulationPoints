// https://medium.com/@ziyoshams/graphs-in-javascript-cc0ed170b156
class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.graph = new Object();
    this.Time = 0;
  }

  addEdge(u, v) {
    if (this.graph[u] === undefined) {
      this.graph[u] = new Array();
    }

    if (this.graph[v] === undefined) {
      this.graph[v] = new Array();
    }

    this.graph[u].push(v);
    this.graph[v].push(u);
  }

  APUtil(u, visited, ap, parent, low, disc) {
    let children = 0;
    visited[u] = true;

    disc[u] = this.Time; 
    low[u] = this.Time;
    this.Time += 1;

    for (const v of this.graph[u]) {
      if (visited[v] == false) {
        parent[v] = u;
        children += 1;
        this.APUtil(v, visited, ap, parent, low, disc);
        
        low[u] = Math.min(low[u], low[v]);
        if (parent[u] == -1 && children > 1) {
          ap[u] = true;
        }

        if (parent[u] != -1 && low[v] >= disc[u]) {
          ap[u] = true;
        }

      } else if (v != parent[u]) {
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  }

  AP() {
    let visited = new Array(this.V),
        disc =  new Array(this.V), 
        low =  new Array(this.V),
        parent =  new Array(this.V),
        ap = new Array(this.V);
    
    for (let i = 0; i < this.V; i++) 
    {
        parent[i] = -1; 
        visited[i] = false; 
        ap[i] = false;
    }

    for (let i = 0; i < this.V; i++) {
      if (visited[i] == false) {
        this.APUtil(i, visited, disc, low, parent, ap); 
      }
    }

    for (let i = 0; i < this.V; i++) {
      if (ap[i] == true) {
        console.log(i + " ");
      }
    }

  } 
}

// g1 = {0: [1], 1: [0, 2], 2: [1, 3], 3: [2]};
g1 = new Graph(4);
g1.addEdge(0, 1);
g1.addEdge(1, 2);
g1.addEdge(2, 3);

/*g1 = new Graph(5) 
g1.addEdge(1, 0);
g1.addEdge(0, 2);
g1.addEdge(2, 1);
g1.addEdge(0, 3);
g1.addEdge(3, 4);*/
g1.AP();
//console.log(g1);