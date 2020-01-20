// Test: Ubuntu 19.04 / node v10.15.2
// Command: node /{path}/Tarjan.js
class Graph {
  constructor() {
    this.graph = new Object();
    this.time = 0;
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

  DFS(u = 0, visited = [], ap = [], parent = [], low = [], disc = []) {
    let children = 0;
    visited[u] = true;

    disc[u] = this.time; 
    low[u] = this.time;
    this.time += 1;

    for (const v of this.graph[u]) {
      if (visited[v] == false) {
        parent[v] = u;
        children += 1;

        this.DFS(v, visited, ap, parent, low, disc);
        
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

  ArticulationPoint() {
    let V =  Object.keys(g1.graph).length; // Vertices
    let visited = new Array(V),
        disc =  new Array(V), 
        low =  new Array(V),
        parent =  new Array(V),
        ap = new Array(V);
    
    for (let i = 0; i < V; i++) 
    {
        parent[i] = -1; 
        visited[i] = false; 
        ap[i] = false;
    }
    
    for (let i = 0; i < V; i++) {
      if (visited[i] == false) {        
        this.DFS(i, visited, ap, parent, low, disc); 
      }
    }

    for (let i = 0; i < V; i++) {
      if (ap[i] == true) {
        console.log(i + " ");
      }
    }

  } 
}

// g1 = {0: [1], 1: [0, 2], 2: [1, 3], 3: [2]};
g1 = new Graph();
g1.addEdge(0, 1);
g1.addEdge(1, 2);
g1.addEdge(2, 3);
g1.ArticulationPoint();