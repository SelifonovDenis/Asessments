//Собеседования
export var asessment = [];
asessment [0] = {
	id: 1,
	active:0,
	date:"25.06.19",
	room:"2",
	id_worker:1,
}
asessment [1] = {
	id: 2,
	active:0,
	date:"25.07.19",
	room:"3",
	id_worker:2,
}
asessment [2] = {
	id: 3,
	active:0,
	date:"25.08.19",
	room:"4",
	id_worker:3,
}

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
	dates:["25.05.19", "9.06.19", "20.06.19"]
}
worker [1] = {
	id: 2,
	active:0,
	family: "Петров",
	name: "Петр",
	subname:"Петрович",
	phone:"8 500 444 44 44",
	email:"petya@mail.ru",
	dates:["25.05.19", "9.06.19", "20.06.19"]
}
worker [2] = {
	id: 3,
	active:0,
	family: "Николаев",
	name: "Игорь",
	subname:"Николаевич",
	phone:"8 333 333 22 22",
	email:"Ivan@mail.ru",
	dates:["29.05.19", "8.06.19", "10.06.19"]
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
						{view:"label",type:"clean", label:"Собеседования", height:40, css:"logo", align:"center", margin:0},
					],
					css:"nav"
				},
				{view:"toolbar", elements:[
						{view:"button", value:"Собеседования"},
						{view:"button", value:"Добавить собеседование", height:50, id:"viewAdd"},
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
										{view:"text", id:"searchRoom", label:"Кабинет"},
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
								{ id:"id",    header:"Id", width:50},
								{ id:"date",    header:"Дата", width:150},
								{ id:"room",    header:"Кабинет", width:150},
								{ id:"fio", header:"Проводит",fillspace:true},

							],
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
							{view:"label", label:"Кандидаты", height:20},
							{
								view:"list",
								height:400,
								template:"#title#",
								select:true,
								id:"candidates"
							},
							
							{height:40},
							{view:"button", id:"butAddDate",value:"Добавить кандидата", disabled:true},
							{view:"button", value:"Удалить кандидата"},
							{view:"button", value:"Переместить в архив"},

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
				{view:"button", value:"Учёт кандидатов", id:"redirect"},
				{view:"button", value:"Учёт сотрудников", id:"redirect2"},
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
			{view:"text", id:"Date", label:"Дата", labelPosition:"top"},
			{view:"text", id:"Room", label:"Кабинет", labelPosition:"top"},
			{view:"text", id:"Worker", label:"Сотрудник", labelPosition:"top"},
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
				{view:"text", id:"changeDate", label:"Дата", labelPosition:"top"},
				{view:"text", id:"changeRoom", label:"Кабинет", labelPosition:"top"},
				{view:"text", id:"changeWorker", label:"Сотрудник", labelPosition:"top"},
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

	asessment.forEach(function (elem, index) {
		worker.forEach(function (workerelem, index) {
			if (elem.id_worker === workerelem.id){
				$$("datatable").add({
					active:0,
					id: elem.id,
					date: elem.date,
					room: elem.room,
					fio:workerelem.family+" "+workerelem.name+" "+workerelem.subname
				});
			}
		})
	})

}






	



