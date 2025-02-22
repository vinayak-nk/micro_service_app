# packages

npm init -y
npm i node-nats-streaming ts-node-dev typescript @types/node
tsc --init -> tsconfig.json

# port forwarding with kubectl

kubectl get pods

kubectl port-forward POD_NAME PORT_LOCAL_MACHINE : PORT_ON_POD

kubectl port-forward nats-depl-6d9bdd744f-5x9v8 4222:4222
kubectl port-forward nats-depl-6d9bdd744f-5x9v8 8222:8222

http://localhost:8222/streaming
http://localhost:8222/streaming/channelsz?subs=1
