import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import customerManPay from './pages/nav1/customerManPay.vue'
import customerManPayeidt from './pages/nav1/customerManPayeidt.vue'
import customerManDetail from './pages/nav1/customerManDetail.vue'
import CustomerManagement from './pages/nav1/CustomerManagement.vue'
import detail from './pages/nav1/detail.vue'
import CashierManagement from './pages/nav1/CashierManagement.vue'
import CustomerApplication from './pages/nav1/CustomerApplication.vue'
import eidt from './pages/nav1/eidt.vue'
import review from './pages/nav1/review.vue'
import jinjian from './pages/nav1/jinjian.vue'
import submit from './pages/nav1/submit.vue'
import ShopManagement from './pages/nav1/ShopManagement.vue'
import BillingManagement from './pages/nav2/BillingManagement.vue'
import InviteFriends from './pages/nav3/InviteFriends.vue'
import Redeem from './pages/nav3/Redeem.vue'
import PointsPrizes from './pages/nav3/PointsPrizes.vue'
import ScratchPrizes from './pages/nav3/ScratchPrizes.vue'
import LinkManagement from './pages/nav3/LinkManagement.vue'
import Reconciliation from './pages/nav4/Reconciliation.vue'
import PersonalInformation from './pages/nav5/PersonalInformation.vue'
import ChangePassword from './pages/nav5/ChangePassword.vue'
import MessagePush from './pages/nav5/MessagePush.vue'
import MessagePushAdd from './pages/nav5/MessagePushAdd.vue'
import RoleManagement from './pages/nav5/RoleManagement.vue'
import RightsAssignment from './pages/nav5/RightsAssignment.vue'
import AccountManagement from './pages/nav5/AccountManagement.vue'
import ScratchPrizesadd from './pages/nav3/ScratchPrizesadd.vue'
import ScratchPrizesaeidt from './pages/nav3/ScratchPrizesaeidt.vue'
import ScratchPrizesaeidtpull from './pages/nav3/ScratchPrizesaeidtpull.vue'
import LinkManagementadd from './pages/nav3/LinkManagementadd.vue'
import LinkManagementeidt from './pages/nav3/LinkManagementeidt.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
/*    { path: '/main', component: Main },*/
    {
        path: '/',
        component: Home,
        name: '客户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/CustomerApplication', component: CustomerApplication, name: 'CustomerApplication'},
            { path: '/CustomerApplication/detail', component: detail, name: 'detail'},
            { path: '/CustomerApplication/eidt', component: eidt, name: 'eidt'},
            { path: '/CustomerApplication/jinjian', component: jinjian, name: 'jinjian'},
            { path: '/CustomerApplication/submit', component: submit, name: 'submit'},
            { path: '/CustomerApplication/review', component: review, name: 'review'},
            { path: '/CustomerManagement', component: CustomerManagement, name: 'CustomerManagement' },
            { path: '/CustomerManagement/customerManPay', component: customerManPay, name: 'customerManPay' },
            { path: '/CustomerManagement/customerManPayeidt', component: customerManPayeidt, name: 'customerManPayeidt' },
            { path: '/CustomerManagement/customerManDetail', component: customerManDetail, name: 'customerManDetail' },
            { path: '/ShopManagement', component: ShopManagement, name: 'ShopManagement' },
            { path: '/CashierManagement', component: CashierManagement, name: 'CashierManagement' }

        ]
    },
    {
        path: '/',
        component: Home,
        name: '账单管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/BillingManagement', component: BillingManagement, name: 'BillingManagement' }
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '活动管理',
        iconCls: 'fa fa-address-card',
        leaf: false,//只有一个节点
        children: [
            { path: '/InviteFriends', component: InviteFriends, name: 'InviteFriends' },
            { path: '/Redeem', component:Redeem, name: 'Redeem' },
            { path: '/PointsPrizes', component: PointsPrizes, name: 'PointsPrizes' },
            { path: '/ScratchPrizes', component: ScratchPrizes, name: 'ScratchPrizes' },
            { path: '/ScratchPrizes/ScratchPrizesadd', component: ScratchPrizesadd, name: 'ScratchPrizesadd' },
            { path: '/ScratchPrizes/ScratchPrizesaeidt', component: ScratchPrizesaeidt, name: 'ScratchPrizesaeidt' },
            { path: '/ScratchPrizes/ScratchPrizesaeidtpull', component: ScratchPrizesaeidtpull, name: 'ScratchPrizesaeidtpull' },
            { path: '/LinkManagement', component: LinkManagement, name: 'LinkManagement' },
            { path: '/LinkManagement/LinkManagementadd', component: LinkManagementadd, name: 'LinkManagementadd' },
            { path: '/LinkManagement/LinkManagementeidt', component: LinkManagementeidt, name: 'LinkManagementeidt' },
        ]

    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/Reconciliation', component: Reconciliation, name: 'Reconciliation' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-setting',
        children: [
            { path: '/PersonalInformation', component: PersonalInformation, name: 'PersonalInformation' },
            { path: '/ChangePassword', component: ChangePassword, name: 'ChangePassword' },
            { path: '/MessagePush', component: MessagePush, name: 'MessagePush' },
            { path: '/MessagePush/MessagePushAdd', component: MessagePushAdd, name: 'MessagePushAdd' },
            { path: '/RoleManagement', component: RoleManagement, name: 'RoleManagement' },
            { path: '/RightsAssignment', component: RightsAssignment, name: 'RightsAssignment' },
            { path: '/AccountManagement', component: AccountManagement, name: 'AccountManagement' },
        ]


    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;