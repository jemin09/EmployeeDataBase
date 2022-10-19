let EmployeeJson=[
    {empcode:'A102', name:'James', age:37, gender:'Male', department:'Finance',designation:'Manager',salary:65000},
    {empcode:'A106', name:'Mary', age:24, gender:'Female', department:'Technology',designation:'Vice-President',salary:68000},
    {empcode:'A122', name:'Bob', age:23, gender:'Male', department:'Marketing',designation:'Manager',salary:51000},
    {empcode:'A088', name:'Julia', age:33, gender:'Female', department:'Finance', designation:'Vice-President',salary:70000},	
    {empcode:'A055', name:'Steve', age:27, gender:'Male', department:'Technology',designation:'Manager',salary:53000},	
    {empcode:'A208', name:'Katherine', age:29, gender:'Female', department:'Marketing',designation:'Manager',salary:61000},
    {empcode:'A181', name:'Edwards', age:31, gender:'Male', department:'Finance',designation:'Trainee',	salary:49000},				
    {empcode:'A029', name:'Margaret', age:32, gender:'Female', department:'Technology',designation:'President',	salary:53000},
    {empcode:'A029', name:'Bill', age:27, gender:'Male', department:'Operations',designation:'Manager',	salary:58000}
    ];
    const departopt=['Finance','Technology','Marketing','Operations'];
    const desigopt=['Manager','Vice-President','Trainee','President'];
    const gendopt=['Male','Female'];
    let selctGen='';
    function showAllEmployee(){
        showDetails(EmployeeJson);
    }
    function showDetails(Employee){
        const arr1=Employee.map((ele)=>{
            let str='<tr class="td1">';
            str+='<td class="td1">'+ele.empcode+'</td>';
            str+='<td class="td1">'+ele.name+'</td>';
            str+='<td class="td1">'+ele.age+'</td>';
            str+='<td class="td1">'+ele.gender+'</td>';
            str+='<td class="td1">'+ele.department+'</td>';
            str+='<td class="td1">'+ele.designation+'</td>';
            str+='<td class="td1">'+ele.salary+'</td>';
            str+='<td><button class="Btn" onclick=editDetails("'+ele.name+'")>Edit</button></td>';
            str+='<tr>';
            //  console.log(str);
            return str;
        });
        let moreoption='<lebel>Filter Employees By</lebel>';
        moreoption+=makeCodeDD('dept',departopt,'Choose Department','');
        moreoption+=makeCodeDD('desig',desigopt,'Choose Designation','');
        moreoption+='<button class="Btn" onclick="filterData()">filter</button>'+'<br/><br/>';
        let header='<tr>';
        header+='<th class=\'th1\' onclick=\'sort(0)\'>Emp Code</th>';
        header+='<th class=\'th1\' onclick=\'sort(1)\'>Name</th>';
        header+='<th class=\'th1\' onclick=\'sort(2)\'>Age</th>';
        header+='<th class=\'th1\' onclick=\'sort(3)\'>Gender</th>';
        header+='<th class=\'th1\' onclick=\'sort(4)\'>Department</th>';
        header+='<th class=\'th1\' onclick=\'sort(5)\'>Designation</th>';
        header+='<th class=\'th1\' onclick=\'sort(6)\'>Salary</th>';
        header+='<th class="th1"></th>';
        header+='</tr>';
        let html=moreoption+'<table class=\'table1\'>'+header+arr1.join('')+'</table>';
        //  console.log(html);
        let element=document.getElementById('ShowTable');
        element.innerHTML=html;
    }

    function makeCodeDD(id,arr,first,selVal){
        const arr1=arr.map(function(opt){
            if(opt==selVal)
                return '<option selected>'+opt+'</option>';
            else
                return '<option>'+opt+'</option>';
        });
        let header='<option>'+first+'</option>';
        if(selVal=='')
            header='<option>'+first+'</option>';
        
        let s1='<select id=\''+id+'\' onchange="changeCB(this)">'+header+arr1.join('')+'</select>';
        return s1;
    }

    function filterData(){
        let departs=document.getElementById('dept').value;
        let desigs=document.getElementById('desig').value;
        let arr1=(departs=='Choose Department' && desigs=='Choose Designation'?showAllEmployee()
        :(departs!='Choose Department' && desigs!='Choose Designation'?filterbyDeptDesig(departs,desigs)
        :(departs!='Choose Department' && desigs=='Choose Designation'?filterByDept(departs):filterByDesig(desigs))));
    showDetails(arr1);
    }
    function filterbyDeptDesig(dept,desig){
        console.log('in dept&desig');
        let arr=EmployeeJson.filter(e1=>{
            return e1.department==dept && e1.designation==desig;
        });
        return arr;
    }
    function filterByDept(dept){
        console.log('in dept');
        let arr=EmployeeJson.filter(e1=>{
            return e1.department==dept;
        });
        return arr;
    }
    function filterByDesig(desig){
        console.log('indesig');
        let arr=EmployeeJson.filter(e1=>{
            return e1.designation==desig;
        });
        return arr;
    }

    //edit existing employee details
    function editDetails(name){
        let emp=EmployeeJson.find(ep=>{
            return ep.name==name;
        });
        selctGen=emp.gender;
        let str='Employee Code <input type="text" id="code" value="'+emp.empcode+'" readonly><br><br>';
        str+='Name <input type="text" id="name1" value="'+emp.name+'"><br><br>';
        str+='Age <input type="text" id="age1" value="'+emp.age+'"><br><br>';
        str+='Gender '+makeRadioboxes('gen',gendopt,selctGen)+'<br><br>';
        str+='Department'+makeCodeDD('dept',departopt,'Choose Department',emp.department)+'<br><br>';
        str+='Designation'+makeCodeDD('desig',desigopt,'Choose Designation',emp.designation)+'<br><br>';
        str+='Salary <input type="text" id="salary1" value="'+emp.salary+'"><br><br>';
        str+='<button class="Btn" onclick="updateDetails()">Edit Employee Details</button><br><br>';
        // console.log(str);
        document.getElementById('ShowTable').innerHTML=str;

    }
    function updateDetails(){
        let code=document.getElementById('code').value;
        console.log(code);
        let em=EmployeeJson.find(e=>{
            return e.empcode==code;
        });
        console.log(em)
        em.name=document.getElementById('name1').value;
        em.age=document.getElementById('age1').value;
        em.gender=selctGen;
        console.log('Gender is=',em.gender);
        em.department=document.getElementById('dept').value;
        em.designation=document.getElementById('desig').value;
        em.salary=document.getElementById('salary1').value;
        console.log(em)

        if(em.name!='' && em.age!='' && em.gender!='' && em.department!='Choose Department' 
        && em.designation!='Choose Designation' && em.salary!=''){
            alert('The employee details have been update');
            showAllEmployee();
        }
        else if(em.name=='' || em.age=='' || em.gender=='' || em.department=='Choose Department' 
        || em.designation=='Choose Designation' || em.salary==''){
            if(em.name==''){
                alert('Enter the name');
            }
            else if(em.age=='')
                alert('Enter the age');
            else if(em.gender=='')
                alert('Enter the Gender');
            else if(em.department=='Choose Department')
                alert('Enter the Department');
            else if(em.designation=='Choose Designation')
                alert('Enter the Designation');
            else if(em.salary=='')
                alert('Enter the Salary');
        }
    }

    function makeRadioboxes(name,arr,selectval){
        let arr1=arr.map(function(val){
            let checkedStr='';
            if(val==selectval)
                checkedStr='checked';
            let s1='<input type="radio"   name="'+name+'" value="'+val+'" onchange="changeCB(this)"  '+checkedStr+'>'+val;
            return s1;
        });
        return arr1.join('');
    }
    function changeCB(elem){ 
        console.log(elem.value);
        if(elem.checked){
            selctGen=elem.value;
        }
    }

    //adding new employee details
    function addnewemp(){
        let str='Employee Code <input type="text" id="code"><br><br>';
        str+='Name <input type="text" id="name1" ><br><br>';
        str+='Age <input type="text" id="age1" ><br><br>';
        str+='Gender '+makeRadioboxes('gen',gendopt,'')+'<br><br>';
        str+='Department'+makeCodeDD('dept',departopt,'Choose Department','')+'<br><br>';
        str+='Designation'+makeCodeDD('desig',desigopt,'Choose Designation','')+'<br><br>';
        str+='Salary <input type="text" id="salary1" ><br><br>';
        str+='<button class="Btn" onclick="addnewEmp()">Add new Employee</button><br><br>';
        document.getElementById('ShowTable').innerHTML=str;
        
    }

    function addnewEmp(){
        let em={};
        em.empcode=document.getElementById('code').value;
        let index=EmployeeJson.findIndex(function(per){
            return per.empcode==em.empcode;
            });
            if(index>=0){
                alert('Employee code already exists.Enter a different employee code');
            }
            else{
                em.name=document.getElementById('name1').value;
                em.age=document.getElementById('age1').value;
                em.gender=selctGen;
                em.department=document.getElementById('dept').value;
                em.designation=document.getElementById('desig').value;
                em.salary=document.getElementById('salary1').value;
                // alert("The employee details have been update");
                if(em.empcode!='' && em.name!='' && em.age!='' && em.gender!='' && em.department!='Choose Department' 
                && em.designation!='Choose Designation' && em.salary!=''){
                    alert('New employee details update successfully');
                    EmployeeJson.push(em);
                    showAllEmployee()
                }
                else if(em.empcode=='' || em.name=='' || em.age=='' || em.gender=='' || em.department=='Choose Department' 
                || em.designation=='Choose Designation' || em.salary==''){
                    if(em.empcode==''){
                        alert('Enter the Code');
                    }
                    else if(em.name=='')
                        alert('Enter the name');
                    else if(em.age=='')
                        alert('Enter the age');
                    else if(em.gender=='')
                        alert('Enter the Gender');
                    else if(em.department=='Choose Department')
                        alert('Enter the Department');
                    else if(em.designation=='Choose Designation')
                        alert('Enter the Designation');
                    else if(em.salary=='')
                        alert('Enter the Salary');
                }
                
                
            }
    }

    //full dump
    function alldumpcode(){
        const arr1=EmployeeJson.map((ele)=>{
            let str='"'+ele.empcode+'"'+'::';
            str+='"'+ele.name+'"'+'::';
            str+='"'+ele.age+'"'+'::';
            str+='"'+ele.gender+'"'+'::';
            str+='"'+ele.department+'"'+'::';
            str+='"'+ele.designation+'"'+'::';
            str+='"'+ele.salary+'"';
            console.log(str);
            return str;
        });
        let html='<div class=\'container\'>'+'['+arr1.join('')+']'+'</div>';
    //  console.log(html);
        let element=document.getElementById('ShowTable');
        element.innerHTML=html;
    }
    function allpartialdumpcode(){
        const arr1=EmployeeJson.map((ele)=>{
            let str='"Code='+ele.empcode+',';
            str+='Name='+ele.name+',';
            str+='Age='+ele.age+',';
            str+='Gender='+ele.gender;
            str+='"';
            console.log(str);
            return str;
        });
        let html='<div class=\'container\'>'+'['+arr1.join()+']'+'</div>';
    //  console.log(html);
        let element=document.getElementById('ShowTable');
        element.innerHTML=html;
    }
    function sort(colno){
        if(colno==0){
            // console.log('in name');
            EmployeeJson.sort(sortCodeAsc);
        }
        else if(colno==1)
            EmployeeJson.sort(sortNameAsc);
        else if(colno==2)
            EmployeeJson.sort(sortAgeAsc);
        else if(colno==3)
            EmployeeJson.sort(sortGenderAsc);
        else if(colno==4)
            EmployeeJson.sort(sortDeptAsc);
        else if(colno==5)
            EmployeeJson.sort(sortDesigAsc);
        else
            EmployeeJson.sort(sortSalaryAsc);
            showAllEmployee()
    }
    function sortCodeAsc(emp1,emp2){
        let code1=emp1.empcode;
        let code2=emp2.empcode;
        if(code1>code2)
            return 1;
        else if(code1<code2)
            return -1;
        else
            return 0;

    }
    function sortNameAsc(emp1,emp2){
        let name1=emp1.name;
        let name2=emp2.name;
        if(name1>name2)
            return 1;
        else if(name1<name2)
            return -1;
        else
            return 0;
    }
    function sortAgeAsc(emp1,emp2){
        let age1=emp1.age;
        let age2=emp2.age;
        if(age1>age2)
            return 1;
        else if(age1<age2)
            return -1;
        else
            return 0;
    }
    function sortGenderAsc(emp1,emp2){
        let gen1=emp1.gender;
        let gen2=emp2.gender;
        if(gen1>gen2)
            return 1;
        else if(gen1<gen2)
            return -1;
        else
            return 0;
    }
    function sortDeptAsc(emp1,emp2){
        let dept1=emp1.department;
        let dept2=emp2.department;
        if(dept1>dept2)
            return 1;
        else if(dept1<dept2)
            return -1;
        else
            return 0;
    }
    function sortDesigAsc(emp1,emp2){
        let desig1=emp1.designation;
        let desig2=emp2.designation;
        if(desig1>desig2)
            return 1;
        else if(desig1<desig2)
            return -1;
        else
            return 0;
    }
    function sortSalaryAsc(emp1,emp2){
        let sal1=emp1.salary;
        let sal2=emp2.salary;
        if(sal1>sal2)
            return 1;
        else if(sal1<sal2)
            return -1;
        else
            return 0;
    }