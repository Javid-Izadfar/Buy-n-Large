<template>
    <div class="modal">
        <div class="modal_wrapper" v-show="isVisible">
            <div class="modal_content">
                <g-row class="h-4" align-v="center">
                    <g-col>
                        <g-box no-padding>
                            <div class="modal_header">
                                <p class="modal_header_title">
                                    {{ title }}
                                </p>
                                <g-button class="modal_header_close p-2"
                                          variant="primary-empty"
                                          title="بستن مودال"
                                          @click="isVisible = false">
                                    <icons-close size="14"/>
                                </g-button>
                            </div>
                            <div class="modal_body p-2">
                                <slot/>
                            </div>
                            <slot name="footer"/>
                        </g-box>
                    </g-col>
                </g-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        isVisible: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
    },
    watch: {
        isVisible(value) {
            document.body.style.overflow = value ? 'hidden' : 'auto';
        },
    },
};
</script>

<style lang="scss" scoped>
    .modal {
        position: fixed;
        top: 0;
        z-index: 50;
        &_wrapper {
            position: absolute;
            inset: 0;
            width: 100vw;
            height: 100vh;
            background: rgba($black, 0.7);
            backdrop-filter: blur(1rem);
        }
        &_content {
            width: 100%;
            height: 100%;
            max-width: 40rem;
            margin: auto;
        }
        &_header {
            padding: $gutter $gutter * 2;
            position: relative;
            &_title {
                font-size: $font-size-lg;
            }
            &_close {
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        &_body {
            max-height: 40vh;
            overflow-y: auto;
        }
    }
</style>
