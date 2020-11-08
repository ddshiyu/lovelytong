const state = {
  name: '',
  avatar: '',
  id: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, id) => {
    state.id = id
  }
}

const actions = {
  setUserInfo({commit}, userInfo) {
    commit('SET_NAME', userInfo.name)
    commit('SET_AVATAR', userInfo.avatar_url)
    commit('SET_ID', userInfo.id)
  },
  removeUserInfo({commit}) {
    commit('SET_NAME', '')
    commit('SET_AVATAR', '')
    commit('SET_ID', '')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}