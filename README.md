# web_chat
Per rendere la chat utilizzabile (da raspberry pi) lanciare questo comano
- sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port8080
Mette la chat in ascolto sulla porta 80 anche se in realtà è aperta sulla 8080
