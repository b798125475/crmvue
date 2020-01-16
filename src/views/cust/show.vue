<template>
<div>
	<el-form ref="clientInfo" :model="clientInfo" label-width="100px">
 
  <el-form-item label="确认流失原因">
    <el-input type="textarea" v-model="clientInfo.ClientLoseReason"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="update()">立即创建</el-button>
    <el-button @click="ret()">取消</el-button>
  </el-form-item>
</el-form>
</div>

</template>

<script>
	export default {
    data() {
      return {
       	
       	clientInfo:{
        	clientState:'',
        	ClientLoseReason:'' ,
        	clientCode:''
        	},
        clientList:{},
       	
      }
    },

    methods: {
     	update(){
     		this.clientInfo.clientCode = this.$route.query.clientCode;
     		console.log(this.$route.query.clientCode);
     		this.clientInfo.clientState=3;
     		this.$axios.post('updateClientStateById',this.clientInfo)
					.then((response) => {
					console.log(this.clientInfo);
					if(response.data==1){
						
						
						alert("客户已流失");
					}else{
						alert("更新失败");
					}
						
					})
					.catch((error) => {
						console.log(error);
					});
     },
    	ret(){
    		this.$router.push("/admin/loss");
    	}
    }
  }
</script>

<style>
</style>