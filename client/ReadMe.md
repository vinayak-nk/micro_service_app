# dependencies

1. npm init -y
2. npm i react react-dom next bootstrap axios

[client] [cause]: Error: connect ECONNREFUSED 10.109.70.137:80

# Domain: http://NAMEOFSERVICE.NAMESPACE.svc.cluster.local

          http://ingress-nginx-controller.ingress-nginx.svc.cluster.local

C:\Users\vinay>kubectl get namespace
NAME STATUS AGE
default Active 2d3h
ingress-nginx Active 2d
kube-node-lease Active 2d3h
kube-public Active 2d3h
kube-system Active 2d3h

C:\Users\vinay>kubectl get services
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
auth-mongo-srv ClusterIP 10.102.170.100 <none> 27017/TCP 36h
auth-srv ClusterIP 10.109.70.137 <none> 3000/TCP 36h
client-srv ClusterIP 10.102.195.154 <none> 3000/TCP 4h16m
kubernetes ClusterIP 10.96.0.1 <none> 443/TCP 2d3h

C:\Users\vinay>kubectl get services -n ingress-nginx
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
ingress-nginx-controller LoadBalancer 10.99.94.68 localhost 80:31637/TCP,443:31911/TCP 2d
ingress-nginx-controller-admission ClusterIP 10.105.49.110 <none> 443/TCP 2d
