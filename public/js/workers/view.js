//Сотрудники
export var worker = [];
worker [0] = {
	id: 1,
	active:0,
	family: "Иванов",
	name: "Иван",
	subname:"Иванович",
	phone:"8 800 555 35 35",
	email:"Ivan@mail.ru",
}
worker [1] = {
	id: 2,
	active:0,
	family: "Петров",
	name: "Петр",
	subname:"Петрович",
	phone:"8 500 444 44 44",
	email:"petya@mail.ru",
}
worker [2] = {
	id: 3,
	active:0,
	family: "Николаев",
	name: "Игорь",
	subname:"Николаевич",
	phone:"8 333 333 22 22",
	email:"Ivan@mail.ru",
}



export function welcome(){
	var heightScreen = document.body.clientHeight;
	var widthScreen = document.body.clientWidth;
	//Левая часть
    webix.ui({
		type:"clean",
		container:"leftPart",
		cols:[
			{ rows:[
				{
					view:"toolbar", elements:[
						{view:"button", value:"Меню", width:60, popup:"menus"},
						{view:"label",type:"clean", label:"Сотрудники", height:40, css:"logo", align:"center", margin:0},
					],
					css:"nav"
				},
				{view:"toolbar", elements:[
						{view:"button", value:"Сотрудники"},
						{view:"button", value:"Добавить сотрудника", height:50, id:"viewAdd"},
						{view:"button", id:"changeButton", value:"Изменить", disabled:true},
						{view:"button", value:"Удалить"},
					],
					css:"nav"
				},
				{
					cols:[
						{view:"accordion",
						multi:true,
						collapsed: true,
						cols:[
							{ header:"Поиск", body:{
								type:"space",	
								rows:[
										{view:"text", id:"searchFamily", label:"Фамилия"},
										{view:"text", id:"searchName", label:"Имя"},
										{view:"text", id:"searchSubname", label:"Отчество"},
										{view:"text", id:"searchPhone", label:"Телефон"},
										{view:"text", id:"searchEmail", label:"Почта"},
										{view:"text", id:"searchDate", label:"Дата собеседования", labelWidth: 150},
										{height:20},
										{view:"button", value:"Найти"},	
									]
								},				
							width: widthScreen*0.2 
							}
						]},
						{
							view:"datatable",
							id:"datatable",
							columns:[
								{ id:"active", header: "", template:"{common.checkbox()}", width:30},
								{ id:"id",    header:"Id", width:30},
								{ id:"family", header:"Фамилия",fillspace:true},
								{ id:"name", header:"Имя",fillspace:true},
								{ id:"subname", header:"Отчество",fillspace:true},
								{ id:"phone", header:"Телефон", width:250},
								{ id:"email", header:"Почта", width:200}
							],
							data: worker,
							select:"row",
							height: heightScreen-100	
						}
					]
				
				}
			], width: widthScreen*0.75},
			{
				rows:[				
					{view:"label", label:"<img src=\"../../../public/img/logo.png\">",height:101, align:"center", css:"logotype"},
					{
						type:"space",
						rows:[
							{view:"label", label:"Даты собеседований", height:20},
							{
								view:"list",
								height:400,
								template:"#title#",
								select:true,
								id:"dates"
							},
							{height:40},
							{view:"button", id:"butAddDate",value:"Добавить дату собеседования", disabled:true},
							{view:"button", value:"Удалить дату"},
						],
						height:heightScreen-101
					}	
				]
			}
		]
	});	
	

	//меню
	webix.ui({
		view:"popup",
		id:"menus",
		height:250,
		width:300,
		body:{
			rows:[
				{view:"button", value:"Учет кандидатов", id:"redirect"},
				{view:"button", value:"Собеседования", id:"redirect2"},
				{view:"button", value:"Выход", id:"out"},
			]
		}
	}).hide();
	
	
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
		type:"space",
		rows:[
				{view:"text", name:"family", label:"Фамилия"},
				{view:"text", name:"name", label:"Имя"},
				{view:"text", name:"subname", label:"Отчество"},
				{view:"text", name:"phone", label:"Телефон"},
				{view:"text", name:"address", label:"Почта"},
				{height:20},
				{view:"button", value:"Добавить сотрудника"},
			]
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
    body:{
		type:"space",	
		rows:[
				{view:"text", id:"changeFamily", label:"Фамилия"},
				{view:"text", id:"changeName", label:"Имя"},
				{view:"text", id:"changeSubname", label:"Отчество"},
				{view:"text", id:"changePhone", label:"Телефон"},
				{view:"text", id:"changeEmail", label:"Почта"},
				{height:20},
				{view:"button", value:"Сохранить изменения"},
			]
		}
	}).hide();

//добаить дату
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
						view:"calendar",
						id:"my_calendar",
						date:new Date(),
						weekHeader:true,
						events:webix.Date.isHoliday,
						width:300,
						height:250
					},
					{height:20},
					{view:"button", value:"Добавить дату"},
				]
			}
		}).hide();
}






	



