def build(vals,n=20):
    T=[[-1,-1,-1] for _ in range(n)]; root=-1; free=0
    for v in vals:
        new=free; T[new]=[-1,v,-1]; free+=1
        if root==-1: root=new; continue
        cur=root; par=-1; left=False
        while cur!=-1:
            par=cur; left = v < T[cur][1]
            cur = T[cur][0] if left else T[cur][2]
        T[par][0 if left else 2]=new
    return T,root,free
def ino(T,r,o):
    if T[r][0]!=-1: ino(T,T[r][0],o)
    o.append(T[r][1])
    if T[r][2]!=-1: ino(T,T[r][2],o)
def pre(T,r,o):
    o.append(T[r][1])
    if T[r][0]!=-1: pre(T,T[r][0],o)
    if T[r][2]!=-1: pre(T,T[r][2],o)
def post(T,r,o):
    if T[r][0]!=-1: post(T,T[r][0],o)
    if T[r][2]!=-1: post(T,T[r][2],o)
    o.append(T[r][1])
def search(T,r,v,path):
    if r==-1: return -1
    path.append(r)
    if T[r][1]==v: return r
    return search(T,T[r][0] if v<T[r][1] else T[r][2],v,path)
def show(T,root,free):
    for i in range(free): print(i,T[i])
    for f in (pre,ino,post):
        o=[]; f(T,root,o); print(f.__name__,o)
T,r,f=build([10,11,5,1,20,7,15]); show(T,r,f)
p=[];print('s15',search(T,r,15,p),p); p=[];print('s12',search(T,r,12,p),p)
# 2022 Nov table
N=[[1,20,5],[2,15,-1],[-1,3,3],[-1,9,4],[-1,10,-1],[-1,58,-1]]+[[-1,-1,-1]]*14
show(N,0,6)
p=[];print('s9',search(N,0,9,p),p)
# add 12
cur=0;v=12
while cur!=-1:
    par=cur; left=v<N[cur][1]; print('cur',cur,N[cur][1],left); cur=N[cur][0] if left else N[cur][2]
print('parent',par,'left',left)
T,r,f=build([50,30,70,20,40,60]); show(T,r,f)
T,r,f=build([10,5,11,1,7]); show(T,r,f)
