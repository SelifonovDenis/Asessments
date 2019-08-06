export function welcome(){
	var heightScreen = document.body.clientHeight;
	var widthScreen = document.body.clientWidth;
	//Левая часть
    webix.ui({
		id:"main",
		type:"clean",
		container:"leftPart",
		cols:[
			{ gravity:3,
				rows:[
				{
					view:"toolbar", elements:[
						{view:"label",type:"clean", label:"Сотрудники", height:40, css:"logo", align:"center", margin:0},
					],
					css:"nav"
				},
				{view:"toolbar", elements:[
						{view:"button", value:"Учет кандидатов", id:"redirect"},
						{view:"button", value:"Собеседования", id:"redirect2"},
						{view:"button", value:"Выход", id:"out"},
						{},

						{view:"button", value:"Добавить сотрудника", height:50, id:"viewAdd"},
						{view:"button", id:"AddArchive", value:"Переместить в архив", disabled:true},


					],
					css:"nav"
				},
				{
					cols:[
						{
							gravity:1,
							view:"accordion",
							multi:true,
							collapsed: true,
							cols:[
							{
								header:"Поиск", body:{
								type:"space",	
								rows:[
										{view:"text", id:"searchFirstName", label:"Фамилия"},
										{view:"text", id:"searchLastName", label:"Имя"},
										{view:"text", id:"searchMiddleName", label:"Отчество"},
										{view:"text", id:"searchPhone", label:"Телефон"},
										{view:"text", id:"searchEmail", label:"Почта"},
										{
											view:"combo",
											id:"searchStatus",
											label:"Статус",
											options:["","В отпуске","На больничном","Трудоспособен"]
										},
										{
											view:"checkbox",
											id:"archive",
											label:"Архив",
											value:0,
										},

										{height:20},
									 	{view:"button", id:"find", value:"Подтвердить"},
									]
								},
							}
						]},
						{
							gravity:2.5,
							view:"datatable",
							id:"datatable",
							columns:[
								{ id:"Id",    header:"Id", width:30, sort:"int"},
								{ id:"First_name", header:"Фамилия",fillspace:true, sort:"string"},
								{ id:"Last_name", header:"Имя",fillspace:true, sort:"string"},
								{ id:"Middle_name", header:"Отчество",fillspace:true, sort:"string"},
								{ id:"Phone", header:"Телефон", width:250},
								{ id:"Email", header:"Почта", width:200}
							],
							select:"row",
							height: heightScreen-100	
						}
					]
				
				}
			]},
			{
				gravity:1,
				rows:[				
					{view:"label", label:"<img src=\"../../../public/img/logo.png\">",height:101, align:"center", css:"logotype"},
					{
						type:"space",
						rows:[
							{view:"label", label:"Даты собеседований", height:20},
							{
								view:"list",
								template:"#title#",
								select:true,
								id:"dates",
							},
							{view:"button", id:"butAddDate",value:"Добавить дату собеседования", disabled:true},
							{view:"button", id:"removeAssessment", value:"Удалить дату", disabled:true},
							{view:"button", id:"changeButton", value:"Изменить сотрудника", disabled:true},
						],
						height:heightScreen-101
					}	
				]
			}
		]
	});

	webix.event(window, "resize", function(){
		$$("main").adjust();
	})
	
	//всплывающее окно "Добавить кандидата"
	webix.ui({
    view:"window",
	position:"center",
    id:"add",
	width: 500,
	modal: true,
	head:"Добавить",
    close:true,
    body:{
		view:"form",
		id:"addForm",
		type:"space",
		rows:[
			{view:"text", name:"firstName", id:"addFirstName", label:"Фамилия"},
			{view:"text", name:"lastName", id:"addLastName", label:"Имя"},
			{view:"text", name:"middleName", id:"addMiddleName", label:"Отчество"},
			{view:"text", name:"phone", id:"addPhone", label:"Телефон"},
			{view:"text", name:"email", id:"addEmail",label:"Почта"},
			{height:20},
			{view:"button", id:"addEmployee", value:"Добавить сотрудника"},
		],
		rules:{
			"firstName":webix.rules.isNotEmpty,
			"lastName":webix.rules.isNotEmpty,
			"middleName":webix.rules.isNotEmpty,
			"phone":webix.rules.isNotEmpty,
			"email":webix.rules.isEmail,
		}
		}
	}).hide();

	//всплывающее окно "изменить"
	webix.ui({
    view:"window",
    id:"changeWindow",
	position:"center",
	width: 500,
	modal: true,
	head:"Изменить",
    close:true,
    body: {

		type: "space",
		view: "form",
		id: "changeForm",
		elements: [
			{view: "text", name: "cfirstName", id: "changeFirstName", label: "Фамилия"},
			{view: "text", name: "clastName", id: "changeLastName", label: "Имя"},
			{view: "text", name: "cmiddleName", id: "changeMiddleName", label: "Отчество"},
			{view: "text", name: "cphone", id: "changePhone", label: "Телефон"},
			{view: "text", name: "cemail", id: "changeEmail", label: "Почта"},
			{
				view:"combo",
				id:"changeStatus",
				label: 'Статус',
				name:"cstatus",
				options:["Активен","Архив"]
			},
			{
				view:"checkbox",
				id:"changeArchive",
				label:"Архив",
				value:0,
			},
			{view: "button", id: "saveChange", value: "Сохранить изменения"},
		],
		rules: {
			"cfirstName": webix.rules.isNotEmpty,
			"clastName": webix.rules.isNotEmpty,
			"cmiddleName": webix.rules.isNotEmpty,
			"cphone": webix.rules.isNotEmpty,
			"cemail": webix.rules.isEmail,
			"cstatus": webix.rules.isNotEmpty,
		}
	}
	}).hide();



//Окно назначить дату
	webix.ui({
		view:"window",
		position:"center",
		id:"addDate",
		width: 500,
		modal: true,
		head:"Добавить",
		close:true,
		body:{
			type:"space",
			rows:[
				{
					view:"datatable",
					id:"Date",
					columns:[
						{ id:"Id",    header:"Id", width:30},
						{ id:"Date",  header:"Дата",fillspace:true},
						{ id:"Cabinet", header:"Кабинет",fillspace:true},
					],
					select:"row",
					height: 400
				},
				{view:"button", id:"AddIdAsessment", value:"Назначить на собеседование"},
			]
		}
	}).hide();
}






	



