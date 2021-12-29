export const defaultData = [
    {
        image_default: '/admin/assets/images/icon/data.svg',
        image_action: '/admin/assets/images/icon/data_ac.svg',
        url: '',
        name: 'STAKE'
    },
    {
        image_default: '/admin/assets/images/icon/pro.svg',
        image_action: '/admin/assets/images/icon/pro_ac.svg',
        url: '',
        name: 'PROPOSALS'
    },
]
export const defaultItemToken = [
    {
        title: 'Available Tokens',
        count: '112',
        function: [
            {
                titleFunction: 'STAKE',
                class: ''
            }
        ],

    }, {
        title: ' Staked Tokens',
        count: '23',
        function: [
            {
                titleFunction: 'UNDELEGATE',
                class: 'active'
            },
            {
                titleFunction: 'REDELEGATE',
                class: ''
            }
        ],

    }, {
        title: 'Rewards',
        count: '0',
        function: [
            {
                titleFunction: 'CLAIM',
                class: 'disable'
            }
        ],
    }, {
        title: 'Unstaked Tokens',
        count: '0',
        function: ''
    },
]



