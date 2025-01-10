import{d as w,u as I,c as p,a as r,b as s,F as _,r as m,e as y,o as l,t as d,n as b,f as a,P as o,g as v,w as h,h as C,i as f,_ as B}from"./index-DkJgSI7m.js";const S={class:"mb-5 md:d-flex mx-auto",style:{"max-width":"50rem"}},R={style:{"min-width":"49%"}},$={id:"main-destination-list",class:"mt-2"},E={class:""},N={class:"d-flex"},V={class:"w-100"},q={class:"d-flex",style:{position:"relative"}},F={class:"circle-count"},O={style:{position:"relative",width:"100%"}},P={style:{position:"relative"}},U={style:{left:"0.25rem",top:"-50%",transform:"translateY(50%)",position:"absolute"}},Y={class:"text-right"},j={style:{width:"auto","text-wrap":"nowrap"}},z={class:"text-sm"},L={style:{"min-width":"49%"}},T={id:"main-destination-list",class:"mt-2"},A={class:"d-flex"},G={class:"w-100"},H={class:"d-flex",style:{position:"relative"}},J={class:"circle-count"},K={style:{position:"relative",width:"100%"}},M={style:{position:"relative"}},Q={style:{left:"0.25rem",top:"-50%",transform:"translateY(50%)",position:"absolute"}},W={class:"text-right"},X={style:{width:"auto","text-wrap":"nowrap"}},Z={class:"text-sm"},tt=w({__name:"Destinations",setup(st){const{contracts:x}=I(),g=p(()=>{const D=x.reduce((n,i)=>(!i.completed&&i.payloads.forEach(t=>{n[t.destinationID]||(n[t.destinationID]={name:t.destinationID,payloads:[]}),n[t.destinationID].payloads.push(t)}),n),{});return Object.values(D).sort((n,i)=>{const t=n.payloads.filter(u=>u.status===o.Collected||u.status===o.Delivered).length;return i.payloads.filter(u=>u.status===o.Collected||u.status===o.Delivered).length-t})}),k=p(()=>x.reduce((e,n)=>(!n.completed&&n.payloads.forEach(i=>{e[i.originID]||(e[i.originID]={name:i.originID,payloads:[]}),e[i.originID].payloads.push(i)}),e),{}));return(D,e)=>{const n=y("Button");return l(),r("main",S,[s("div",R,[e[2]||(e[2]=s("h3",{class:"main-destination-heading"},"Origins",-1)),s("div",null,[(l(!0),r(_,null,m(k.value,i=>(l(),r("div",$,[s("h4",E,d(i.name),1),(l(!0),r(_,null,m(i.payloads,t=>(l(),r("div",{id:"destination-instance-payload",class:b([{disabled:t.status!=a(o).Ready}])},[s("div",N,[s("div",V,[s("div",q,[s("div",F,"x"+d(t.quantity),1),s("div",O,[s("div",P,[s("div",U,d(t.commodityID),1)])])])]),s("div",Y,[s("div",j,"Status: "+d(t.status),1),t.status==a(o).Ready?(l(),v(n,{key:0,class:"btn btn-primary ml-auto",onClick:c=>t.status=a(o).Collected},{default:h(()=>e[0]||(e[0]=[f("Collect")])),_:2},1032,["onClick"])):C("",!0),t.status===a(o).Collected?(l(),v(n,{key:1,class:"btn btn-undo ml-auto",onClick:c=>t.status=a(o).Ready},{default:h(()=>e[1]||(e[1]=[f("Uncollect")])),_:2},1032,["onClick"])):C("",!0)])]),s("p",z,d(t.originID)+" -> "+d(t.destinationID),1)],2))),256))]))),256))])]),e[6]||(e[6]=s("div",{class:"d-none md:d-block",style:{height:"100%",width:"2%"}},null,-1)),s("div",L,[e[5]||(e[5]=s("h3",{class:"main-destination-heading"},"Destinations",-1)),s("div",null,[(l(!0),r(_,null,m(g.value,i=>(l(),r("div",T,[s("h3",null,d(i.name),1),(l(!0),r(_,null,m(i.payloads,t=>(l(),r("div",{id:"destination-instance-payload",class:b([{disabled:t.status==a(o).Ready}])},[s("div",A,[s("div",G,[s("div",H,[s("div",J,"x"+d(t.quantity),1),s("div",K,[s("div",M,[s("div",Q,d(t.commodityID),1)])])])]),s("div",W,[s("div",X,"Status: "+d(t.status),1),t.status===a(o).Collected?(l(),v(n,{key:0,class:"btn btn-primary ml-auto",onClick:c=>t.status=a(o).Delivered},{default:h(()=>e[3]||(e[3]=[f("Deliver")])),_:2},1032,["onClick"])):C("",!0),t.status===a(o).Delivered?(l(),v(n,{key:1,class:"btn btn-undo ml-auto",onClick:c=>t.status=a(o).Collected},{default:h(()=>e[4]||(e[4]=[f("Undeliver")])),_:2},1032,["onClick"])):C("",!0)])]),s("p",Z,d(t.originID)+" -> "+d(t.destinationID),1)],2))),256))]))),256))])])])}}}),it=B(tt,[["__scopeId","data-v-58750a2c"]]);export{it as default};
