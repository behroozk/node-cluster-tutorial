## Node Cluster Module Examples
-------------------------------

This repo contains several examples on how Node.js cluster module can be used to increase performance of Node applications. The complete article is [here](http://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/ "How to create a node.js cluster for speeding up your apps").

To clone this repo in your machine:

```
git clone https://github.com/behroozk/node-cluster-tutorial.git
```

Then, to download all the requirements:

```
npm install
```

Here is a list of all the examples in this repo:

1. `simple.js`: contains a simple use of cluster module
2. `express.js`: a more advanced example with built with Express server
3. `performance.js`:  a dummy example for benchmarking performance of the application using cluster module
4. `communication.js`: demonstrate how master and workers can communicate
5. `zer_downtime.js`:  an example for automatically restarting workers without stopping the application
