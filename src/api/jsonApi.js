import users from './../json/users.json';
import courses from './../json/courses.json';
import chapters from './../json/chapters.json';
import UserIcon from 'material-ui/svg-icons/action/account-circle';
import CourseIcon from 'material-ui/svg-icons/social/school';
import ChapterIcon from 'material-ui/svg-icons/action/speaker-notes';

class JsonApi {
    //Creates Tab and sets default values
    static createTab(type, index, parentId, parentType) {
        let table = this.getTable(type, parentId);
        let page = this.getPage(table, 10, 0);
        let tab = this.createDefaultTab(type);

        tab.table.data = table;
        tab.page.data = page;
        tab.id = index;
        tab.parent.type = (parentType != null) ? parentType : null;
        tab.parent.name = (parentType != null) ? this.getName(parentType, parentId) : null;

        return tab;
    }
    
    //Creates blank tab of whatever type
    static createDefaultTab(type) {
        switch(type) {
            case "user":
                return {
                    title: "Users",
                    icon: UserIcon,
                    table: {
                        name: "user",
                        title: "name",
                        subTitleProp: "age",
                        subtitle: "Age: ",
                        avatar: "picture",
                        data: null
                    },
                    page: {
                        length: 10,
                        id: 0,
                        data: null,
                        isSearching: false
                    },
                    children: [{
                        type: "course",
                        title: "Courses",
                        subtitle: "View User's Courses",
                        icon: CourseIcon}],
                    parent: {},
                    active: true
                }

            case "chapter":
                return {
                    title: "Chapters",
                    icon: ChapterIcon,
                    searchChildren: "View Chapter's Course",
                    table: {
                        name: "chapter",
                        title: "name",
                        subTitleProp: "duration_mins",
                        subtitle: "Duration: ",
                        data: null
                    },
                    page: {
                        length: 10,
                        id: 0,
                        data: null,
                        isSearching: false
                    },
                    children: [{
                        type: "course",
                        title: "Courses",
                        subtitle: "View Chapter's Courses",
                        icon: CourseIcon
                    }],
                    parent: {},
                    active: true
                }

            case "course":
                return {
                    title: "Courses",
                    icon: CourseIcon,
                    searchChildren: "View Course's Chapters",
                    table: {
                        name: "course",
                        title: "name",
                        subTitleProp: "difficulty",
                        subtitle: "Difficulty: ",
                        data: null
                    },
                    page: {
                        length: 10,
                        id: 0,
                        data: null,
                        isSearching: false
                    },
                    children: [{
                            type: "user",
                            title: "User",
                            subtitle: "View Course's User",
                            icon: UserIcon
                        },
                        {
                            type: "chapter",
                            title: "Chapters",
                            subtitle: "View Course's Chapters",
                            icon: ChapterIcon
                        }],
                        parent: {},
                    active: true
                }

            default:
                return null;
        }
    }

    static searchFor(table, value) {
        return table.filter((element) => element.name.toLowerCase().includes(value.toLowerCase()));
    }

    static getTable(table, parentId) {
        //Gets table filtering for parents id when given a parent
        switch(table.toLowerCase()) {
            case "user":
                return (parentId != null) ? users.filter((user) => (user.id === parentId)) : users;
                
            case "chapter":
                return (parentId != null) ? chapters.filter((chapter) => (chapter.course_id === parentId)) : chapters;

            case "course":
                return (parentId != null) ? courses.filter((course) => (course.user_id === parentId)) : courses;

            default:
                return null;
        }
    }

    //Gets name from id
    static getName(type, id) {
        switch(type.toLowerCase()) {
            case "user":
                return users.filter((user) => user.id === id)[0].name;

            case "chapter":
                return chapters.filter((chapter) => chapter.id === id)[0].name;

            case "course":
                return courses.filter((course) => course.id === id)[0].name;

            default:
                return null;
        }
    }

    static getPage(table, pageLength, pageNumber) {
        //Gets max value either the max value or the page length + new page start
        let maxValue = (pageLength + (pageNumber * pageLength) > table.length) ? table.length : (pageNumber * pageLength) + pageLength;
        return table.slice(pageNumber * pageLength, maxValue);
    }
}

export default JsonApi; 