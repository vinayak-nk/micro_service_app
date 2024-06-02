# micro_service_app
BRANCH 2

Tech Stack
===========
1. Next JS
2. Typescript
3. Node js
4. Express
5. MongoDB
6. Redis
7. NATS - event bus


To add localhost url
--------------------
Windows -> C:\Windows\System32\drivers\etc
Linus -> /etc/hosts
Eg:

/*
# Added by Docker Desktop
192.168.0.104 host.docker.internal
192.168.0.104 gateway.docker.internal
# To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
# End of section

127.0.0.1 posts.com
127.0.0.1 ticketing.dev
*/

ingress-nginx
----------------
https://kubernetes.github.io/ingress-nginx/deploy/
If the k8s clulster is deleted then reinstall it

SKAFFOLD
-----------
https://chocolatey.org/install
https://skaffold.dev/docs/install/


ESLINT, Prettier
------------------
https://gist.github.com/silver-xu/1dcceaa14c4f0253d9637d4811948437

RUN
-----
to clean up images after service terminated
skaffold.exe dev --no-prune=false --cache-artifacts=false

Chrome security
----------------
type "thisisunsafe" on google chrome


========================
Application
========================

Resources
----------
1. User
2. Ticket
3. Order
4. Charge/Payment

Services
---------
1. Auth
2. tickets -> creation/edit
3. orders
4. expiration -> cancel order after 25 mins
5. payments
