import users from './../json/users.json';
import courses from './../json/courses.json';
import chapters from './../json/chapters.json';
import UserIcon from 'material-ui/svg-icons/action/account-circle';
import CourseIcon from 'material-ui/svg-icons/social/school';
import ChapterIcon from 'material-ui/svg-icons/action/speaker-notes';

class JsonApi {
    //Creates Tab and sets default values
    static createTab(type, index, parentId, parentType) {
        let table = this.getTable(type, parentId, parentType);
        let page = this.getPage(table, 10, 0);
        let tab = this.createDefaultTab(type);
        tab.table.data = table;
        tab.page.data = page;
        tab.id = index;
        tab.parent.type = (parentType != null) ? parentType : null;
        tab.parent.name = (parentType != null) ? this.getEntryFromId(parentType, parentId).name : null;

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

    static getTable(table, parentId, parentType) {
        let parent;
        parent = (parentId != null) ? this.getEntryFromId(parentType, parentId) : null;
        console.log(table, parentId, parentType)
        //Gets table filtering for parents id when given a parent
        switch(table.toLowerCase()) {
            case "user":

                return (parent != null) ? users.filter((user) => (user.id === parent.user_id)) : users;
                
            case "chapter":
                return (parent != null) ? chapters.filter((chapter) => (chapter.course_id === parentId)) : chapters;

            case "course":
                if (parentType === "user")
                    return (parent != null) ? courses.filter((course) => (course.user_id === parent.id)) : courses;
                if (parentType === "chapter")
                    return (parent != null) ? courses.filter((course) => (course.id === parent.course_id)) : courses;
                if (parentType == null) return courses;
                break;

            default:
                return null;
        }
    }

    //Gets name from id
    static getEntryFromId(type, id) {
        console.log(type)
        switch(type) {
            case "user":
                return users.filter((user) => user.id === id)[0];

            case "chapter":
                return chapters.filter((chapter) => chapter.id === id)[0];

            case "course":
                return courses.filter((course) => course.id === id)[0];

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