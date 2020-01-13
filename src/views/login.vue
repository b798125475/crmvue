<template>
	<div id="xixi">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>登录</span> 
		  </div>
		  <div  class="text item">
		   <el-form ref="Sysuser" :model="Sysuser" label-width="70px">
		     <el-form-item label="用户名" >
		       <el-input v-model="Sysuser.userName" placeholder="请输入用户名" ></el-input>
		     </el-form-item>
		     <el-form-item label="密码">
			 <el-input placeholder="请输入密码" v-model="Sysuser.userPassword" show-password></el-input>
		     </el-form-item>
		     <el-form-item  style="text-align: center;">
		       <el-button type="primary" @click="onSubmit">登录</el-button>
			   <el-button type="reset" @click="onrest">重置</el-button> 
		     </el-form-item>
		   </el-form>
		  </div>
		</el-card>

	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        Sysuser: {
	          userName: '',
			  userPassword: ''
	         
	        }
	      }
	    },
	    methods: {
	      onSubmit() {
			  if(this.Sysuser.userName=='')
			  {
				  alert('请填写用户名');
				  return;
			  }
			  if(this.Sysuser.userPassword=='')
			  {
				  alert('请输入密码');
				  return;
			  }
	         this.$axios.post('login', this.Sysuser)
	         	.then((response) => {
	         		if(response.data==''){
	         			alert('用户名或密码输入错误！');
	         		}else{
	         			// this.$setSessionStorage('users',response.data);
	         			this.$router.push('/admin');
					
	         		}
	         	})
	         	.catch((error) => {
	         		console.log(error);
	         	});
	      },
		  onrest(){
			  this.Sysuser.userName='',
			  this.Sysuser.userPassword=''
		  }
	    }
	  }
</script>

<style >
	
	
	
	.text {
	    font-size: 14px;
		
	  }
	
	  .item {
	    margin-bottom: 18px;
		
	  }
	
	  .clearfix:before,
	  .clearfix:after {
	    display: table;
	    content: "";
	  }
	  .clearfix:after {
	    clear: both
	  }
	
	  .box-card {
	    width: 350px;
		margin: 0 auto;
		margin-top: 200px;
	  }
	  .clearfix{
		  text-align: center;
		  font-size:large;
	  }
	
	  
	 
</style>
