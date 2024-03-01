module.exports = {
    
    "별모임": {
        span: 10*60*1000,
        context: (at)=>{
            const koreanDate = at.toLocaleDateString('ko-KR', {timeZone: 'Asia/Seoul'})
            return {
                title: `${koreanDate} 별모임`
            }
        },
        logMessage: (user, at, context)=>{
            return `${user.name}(${user.major}) ${context.title}에 참가하였습니다.`
        }
    },

    "디딤돌": {
        span: 10*60*1000,
        context: (at)=>{
            const koreanDate = at.toLocaleDateString('ko-KR', {timeZone: 'Asia/Seoul'})
            return {
                title: `${koreanDate} 별모임`
            }
        },
        logMessage: (user, at, context)=>{
            return `${user.name}(${user.major}) ${context.title}에 참가하였습니다.`
        }
    },
    
    "자율돔관": {
        span: 10*60*1000,
        context: (at)=>{
            const koreanDate = at.toLocaleDateString('ko-KR', {timeZone: 'Asia/Seoul'})
            return {
                title: `${koreanDate} 자율돔관`
            }
        },
        logMessage: (user, at, context)=>{
            return `${user.name}(${user.major}) ${context.title}에 참가하였습니다.`
        }
    },
    
    "소관": {
        span: 10*60*1000,
        context: (at)=>{
            const koreanDate = at.toLocaleDateString('ko-KR', {timeZone: 'Asia/Seoul'})
            return {
                title: `${koreanDate} 소관`
            }
        },
        logMessage: (user, at, context)=>{
            return `${user.name}(${user.major}) ${context.title}에 참가하였습니다.`
        }
    },
}