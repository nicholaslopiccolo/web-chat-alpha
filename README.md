# web_chat
per spostare far funzionare la chat utilizzare questo codice
- sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port8080
