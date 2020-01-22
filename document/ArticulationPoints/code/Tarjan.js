/**
 * Test: Ubuntu 19.04 / node v10.15.2
 * Command: node /{path}/Tarjan.js
 * Based on: https://www.geeksforgeeks.org/articulation-points-or-cut-vertices-in-a-graph/
 */
class Graph {
  constructor() {
    this.graph = new Object();
    this.time = 0; // Valor actual del tiempo de descubrimiento.
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
    let childCount = 0;
    visited[u] = true;

    disc[u] = this.time; 
    low[u] = this.time;
    this.time += 1;

    for (const v of this.graph[u]) {
      if (visited[v] == false) {
        parent[v] = u;
        childCount += 1;

        this.DFS(v, visited, ap, parent, low, disc);
        
        low[u] = Math.min(low[u], low[v]);
        if (parent[u] == -1 && childCount > 1) {
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
    let V =  Object.keys(this.graph).length; // Numero de vertices.
    let visited = new Array(V), // Denota si se visita o no un vertice durante el DFS.
        disc =  new Array(V), // Almacenan el tiempo de descubrimiento de cada vertice.
        low =  new Array(V), // Almacena, para cada vertice, el tiempo descubierto del vertice mas antiguo.
        parent =  new Array(V), // Almacena el padre de cada vertice en el arbol DFS.
        ap = new Array(V); // Almacena los puntos de articulacion.
    
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
        // Imprime los puntos de articulacion.
        console.log(i);
      }
    }

  } 
}

// { 0: [ 1, 3 ], 1: [ 0, 2 ], 2: [ 1, 3, 4, 5 ], 3: [ 0, 2 ], 4: [ 2 ], 5: [ 2 ] }
g = new Graph();
g.addEdge(0, 1);
g.addEdge(0, 3);
g.addEdge(1, 2);
g.addEdge(3, 2);
g.addEdge(2, 4);
g.addEdge(2, 5);
g.ArticulationPoint();